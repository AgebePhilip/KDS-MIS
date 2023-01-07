import {Request, Response, Router} from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { lang } from '../../helper/lang/language';
import { successResponse } from '../../helper/success-response';
import { error_codes } from '../../helper/util/error-codes';
import {User} from '../../models/userModel';
import { JWT } from '../../services/Jwt';
import { redis_client } from '../../startup/redis-config';

const router = Router()

router.post('/verify_email',

  async (req: Request, res: Response)=>{

  const {otp, key} = req.body;

  const result = await redis_client.get(key)

  console.log(result, key);
  
  if(!result){
    throw new BadRequestError(lang.invalid_key, error_codes.invalid_key)
  }
  

  const {email, code} = JSON.parse(result);

  if(code != otp){
    throw new BadRequestError(lang.invalid_code, error_codes.invalid_code)
  }

  const user = await User.findOne({email})
  if(!user){
    throw new BadRequestError(lang.email_not_found, error_codes.account_not_found);
  }

  if(user.isVerified){
    throw new BadRequestError(lang.account_already_verified, error_codes.account_already_verified);
  }

  if(user.suspended){
    throw new BadRequestError(lang.is_suspended, error_codes.account_suspended);
  }

  const token = await JWT.getToken({
    email:user.email,
    id:user._id.toString('hex'),
    userType: user.userType,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),

  })
  req.session = {
    jwt: token
  };


  user.isVerified=true;
  await user.save();

  const  data = { 
    message: `Your account have been verified`,
    email: user.email,
    userType: user.userType,
    suspended: user.suspended,
    profile: user.profile,
    token,
    isVerified: user.isVerified,
    id: user.id
  }

 res.status(200).send(successResponse(data))

})

export default router;