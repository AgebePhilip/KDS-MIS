import { Request, Response, Router } from 'express';
import {body} from 'express-validator'
import { BadRequestError } from '../../errors/bad-request-error';
import { isDateValid } from '../../helper/dateHelper';
import { lang } from '../../helper/lang/language';
import { Roles } from '../../helper/role';
import { successResponse } from '../../helper/success-response';
import { error_codes } from '../../helper/util/error-codes';
import { validateRequest } from '../../middleware/validate-request';
import { User } from '../../models/userModel';
import { JWT } from '../../services/Jwt';
import { Password } from '../../services/Password';

const router = Router();

router.post('/signin', [
   body('email')
    .trim()
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Passwords must be provided')
], validateRequest,  async (req : Request, res : Response) => {
 
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if(!user)
    throw new BadRequestError('Invalid email or password');

  const isValid = await Password.compare(user.password, password)

  if (!isValid) throw new BadRequestError('Invalid email or password');

  if(!user.isVerified){
    throw new BadRequestError(lang.account_not_verified, error_codes.account_not_verified);
  }

  if(user.suspended){
    throw new BadRequestError(lang.is_suspended, error_codes.account_suspended);
  }

  if(user.userType === Roles.user && user.subscribed){
    const isvalid  = isDateValid(user.expiresAt);
    if(!isvalid){
      user.expiresAt = undefined;
      user.subscribed= false;
      await user.save();
    }

    console.log(isvalid);
    
  }

  const token = await JWT.getToken({
    email:user.email,
    id:user._id.toString('hex'),
    userType: user.userType,
    subscribed:user.subscribed as boolean,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
  })

  req.session = {
    jwt: token
  };

  res.status(200).send(successResponse(user))
})



export default router;