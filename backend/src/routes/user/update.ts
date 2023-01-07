import {Request, Response, Router} from 'express'
import { param, body} from 'express-validator';
import {User} from '../../models/userModel';
import { requireAuth } from '../../middleware/require-auth';
import { validateRequest } from '../../middleware/validate-request';
import { NotFoundError } from '../../errors/not-found';
import { successResponse } from '../../helper/success-response';

const router = Router()

router.put('/:id/detail',
    requireAuth,
    [
    param('id')
      .isString()
      .trim()
      .withMessage({message:'id must be provided'}),
  ], 
  validateRequest,
  async (req: Request, res:Response) => {


    const {firstName, lastName, phone} = req.body;

    const user = await User.findOne({_id: req.params.id});

    if(!user){
      throw new NotFoundError("User not found");
    }

    user.set({
       firstName,
       lastName,
        phone
    })  
    await user.save();
  
  res.status(200).send(successResponse(user))
});





export default  router;