import {Request, Response, Router} from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { MailMessagePublisher } from '../../event/mail-publisher';
import { lang } from '../../helper/lang/language';
import { successResponse } from '../../helper/success-response';
import { GenerateToken } from '../../helper/user-tokens';
import { error_codes } from '../../helper/util/error-codes';
import {User} from '../../models/userModel';
import { redis_client } from '../../startup/redis-config';

const router = Router()

router.post('/resend_token',

 async (req: Request, res: Response)=>{

  const {email} = req.body;

  const user = await User.findOne({email})

  if(!user){
    throw new BadRequestError(lang.email_not_found, error_codes.account_not_found);
  }

  const otpCode     = GenerateToken.otp();
  const keyID       = GenerateToken.generateKey(); 
  const dateObject  = GenerateToken.expireAt();

 new  MailMessagePublisher(redis_client.client).publish({
    to:user.email,
    subject: lang.verify_account,
    data:{
      code:otpCode
    }
 })
 
 await redis_client.set(keyID, JSON.stringify({email:user.email,code:otpCode}))
 await redis_client.clear(keyID, dateObject.seconds);

const  data = { 
      message: "Email sent to your email",
      time_left: dateObject.time,
      key: keyID
}
 res.status(200).send(successResponse(data))

})

export default router;