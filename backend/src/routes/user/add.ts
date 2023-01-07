import { Router, Request, Response } from 'express';

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
import { requireAuth } from '../../middleware/require-auth';
import { permission } from '../../middleware/permission';
import { Roles } from '../../helper/role';


const router = Router();


router.post('/add',
  requireAuth,
  permission(Roles.admin),

 [
   body('email')
    .isEmail()
    .trim()
    .notEmpty()
    .withMessage({message:'Email must be valid'}),
   body('userType')
    .trim()
    .isString()
    .notEmpty()
    .withMessage({message:'User type must be provided'})
],
 validateRequest,

async (req: Request, res: Response) => {

  const {email, userType, firstName, lastName, phone} = req.body;
  const password = GenerateToken.generateKey(); 

  const existingUser = await User.findOne({email});

  if(existingUser){
    throw new BadRequestError('Users already exist')
  }

  const user =  new User(
    { email,
      password,
      userType,
      subscribed: true,
      firstName,
      lastName,
      phone
    });


  const otpCode = GenerateToken.otp();
  const keyID = GenerateToken.generateKey(); 
  const dateObject = GenerateToken.expireAt();
  await user.save();

  new  MailMessagePublisher(redis_client.client).publish({
      to:user.email,
      subject: lang.verify_account,
      data:{
        code:otpCode
      }
  })

 await redis_client.set(keyID, JSON.stringify({email:user.email,code:otpCode}))
 await redis_client.clear(keyID, dateObject.seconds);

    
  const token = await JWT.getToken({
    email:user.email,
    id:user._id.toString('hex'),
    userType: user.userType,
    subscribed:user.subscribed,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  })
  req.session = {
    jwt: token
  };

  res.status(201).send(successResponse({
    firstName: user.firstName,
    lastName: user.lastName,
    id:user._id.toString('hex'),
    email: user.email,
    userType: user.userType,
    subscribed: user.subscribed,
    phone: user.phone,
    profile: user.profile,
    suspended: user.suspended,
    isVerified: user.isVerified
  }))
     
})

export default router;