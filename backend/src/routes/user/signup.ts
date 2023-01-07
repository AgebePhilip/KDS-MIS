import { Router, Request, Response } from 'express';
import { UserType } from '../../services/types/user';

import {body} from 'express-validator';
import { User } from '../../models/userModel';
import { JWT } from '../../services/Jwt';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middleware/validate-request';
import { GenerateToken } from '../../helper/user-tokens';
import { MailMessagePublisher } from '../../event/mail-publisher';
import { redis_client } from '../../startup/redis-config';
import { lang } from '../../helper/lang/language';
import { successResponse } from '../../helper/success-response';


const router = Router();


router.post('/signup', [
   body('email')
    .isEmail()
    .trim()
    .withMessage('Email must be valid'),
   body('password')
    .trim()
    .isLength({min:4, max:24})
    .withMessage('Passwords must be at least 4 characters and at most 24')
], validateRequest, async (req: Request, res: Response) => {

  const {email, password} = req.body;

  const existingUser = await User.findOne({email});

  if(existingUser){
    throw new BadRequestError('Users already exist')
  }

  const user =  new User({email, password, userType: UserType.User});


  const otpCode = GenerateToken.otp();
  const keyID = GenerateToken.generateKey(); 
  const dateObject = GenerateToken.expireAt();
  await user.save();


  console.log("came here now", keyID, JSON.stringify({email:user.email,code:otpCode}));
 


  await redis_client.set(keyID, JSON.stringify({email:user.email,code:otpCode}))
  await redis_client.clear(keyID, dateObject.seconds);
 
 

  try {
    await new  MailMessagePublisher(redis_client.client).publish({
      to:user.email,
      subject: lang.verify_account,
      data:{
        code:otpCode
      }
  }) 
  } catch (error) {
    console.log(error, 'eree');

  }

    


    
  const token = await JWT.getToken({
    email:user.email,
    id:user._id.toString('hex'),
    userType: user.userType,
    subscribed:user.subscribed,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
  })
  req.session = {
    jwt: token
  };

  res.status(201).send(successResponse({
    key:keyID,
    firstName: user.firstName,
    lastName: user.lastName,
    id:user._id.toString('hex'),
    userType: user.userType,
    subscribed: user.subscribed,
    phone: user.phone,
    profile: user.profile,
    suspended: user.suspended,
    isVerified: user.isVerified
  }))
     

})


export default router;