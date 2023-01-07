import {Request, Response, Router} from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { lang } from '../../helper/lang/language';
import { successResponse } from '../../helper/success-response';
import { error_codes } from '../../helper/util/error-codes';
import { User} from '../../models/userModel';
import { redis_client } from '../../startup/redis-config';

const router = Router()


router.post('/change_password',
 async (req: Request, res: Response)=>{

  const {password, key} = req.body;

  const result = await redis_client.get(key || "")
  
  if(!result){
    throw new BadRequestError(lang.invalid_key, error_codes.invalid_key)
  }
  
  const {email} = JSON.parse(result);

  const user = await User.findOne({email})
  if(!user){
    throw new BadRequestError(lang.email_not_found, error_codes.account_not_found);
  }

  if(user.suspended){
    throw new BadRequestError(lang.is_suspended, error_codes.account_suspended);
  }

  user.password = password;
  await user.save();

 const data = {
    message:"password updated"
  }

  res.status(200).send(successResponse(data))
})

export default router;