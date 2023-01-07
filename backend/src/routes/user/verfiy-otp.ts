import {Request, Response, Router} from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { lang } from '../../helper/lang/language';
import { successResponse } from '../../helper/success-response';
import { GenerateToken } from '../../helper/user-tokens';
import { error_codes } from '../../helper/util/error-codes';
import {User} from '../../models/userModel';
import { JWT } from '../../services/Jwt';
import { redis_client } from '../../startup/redis-config';

const router = Router()

router.post("/verify_token",

async (req: Request, res: Response)=>{

  const {otp, key} = req.body;

  console.log(key, "Key valdijdij");
  

  const result = await redis_client.get(key)

  console.log(result);
  

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

  if(user.suspended){
    throw new BadRequestError(lang.is_suspended, error_codes.account_suspended);
  }

 const dateObject = GenerateToken.expireAt();
 await redis_client.set(key, JSON.stringify({email:user.email}))
 await redis_client.clear(key, dateObject.seconds);

const  data = { 
      key
    }
 res.status(200).send(successResponse(data))
})
export default router;