import {Request, Response, Router} from 'express'
import { param} from 'express-validator';
import {User} from '../../models/userModel';
import { requireAuth } from '../../middleware/require-auth';
import { validateRequest } from '../../middleware/validate-request';
import { NotFoundError } from '../../errors/not-found';
import { permission } from '../../middleware/permission';
import { Roles } from '../../helper/role';
import { successResponse } from '../../helper/success-response';


const router = Router()

router.put('/:id/admin',
    requireAuth,
    permission(Roles.admin),
    [
    param('id')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('id must be provided'),
  ], 
   validateRequest,
  async (req: Request, res:Response) => {

    const update = {...req.body}
    const user = await User.findOneAndUpdate(
      {_id: req.params.id},
      update,
      {
        new:true
      });

    if(!user){
      throw new NotFoundError("User not found");
    }

  
  res.status(200).send(successResponse(user))
});

export default router