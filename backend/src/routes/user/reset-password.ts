import {User} from '../../models/userModel';
import {Request, Response, Router} from 'express';
import {lang} from '../../helper/lang/language'; 
import {error_codes} from '../../helper/util/error-codes';
import {successResponse} from '../../helper/success-response';
import { BadRequestError } from '../../errors/bad-request-error';
import {MailMessagePublisher} from '../../event/mail-publisher'
import {redis_client} from '../../startup/redis-config';
import { GenerateToken } from '../../helper/user-tokens';

const router = Router()

router.post("/reset_password",
async(req: Request, res: Response) => {

  const {email} = req.body;

  const existingUser = await User.findOne({email});

  if(!existingUser){
    throw new BadRequestError(lang.email_not_found, error_codes.account_not_found);
  }

  const otpCode = GenerateToken.otp();
  const keyID = GenerateToken.generateKey(); 
  const dateObject = GenerateToken.expireAt();

 new  MailMessagePublisher(redis_client.client).publish({
    to:existingUser.email,
    subject: lang.verify_account,
    data:{
      code:otpCode
    }
 })

 await redis_client.set(keyID, JSON.stringify({email:existingUser.email,code:otpCode}))
 await redis_client.clear(keyID, dateObject.seconds);

const  data = { 
    email: existingUser.email,
    message: `You have until ${dateObject.time} to verify your email`,
    time_left: dateObject.time.toString(),
    key: keyID
}
 res.status(200).send(successResponse(data))
})

export default router;

