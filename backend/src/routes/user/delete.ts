import {Request, Response, Router} from 'express'
import {param} from 'express-validator';
import { NotFoundError } from '../../errors/not-found';
import { Roles } from '../../helper/role';
import { successResponse } from '../../helper/success-response';
import { permission } from '../../middleware/permission';
import { requireAuth } from '../../middleware/require-auth';
import { validateRequest } from '../../middleware/validate-request';
import {User} from '../../models/userModel';
import fs from 'fs';
import path from 'path';

const router = Router()

router.delete('/:id',
    requireAuth,
    permission(Roles.admin),
    [
    param("id")
      .isString()
      .trim()
      .withMessage('id params must be provided'),
  ], 
  validateRequest,
  async (req: Request, res:Response) => {

  const {id} = req.params;

  const user = await User.findOneAndDelete({_id: id});

  if(!user){
    throw new NotFoundError("user not found");
  }

  if(user.profile){

    console.log();

    let filename = path.basename(user.profile);
    fs.unlink(`public/users/profile/${filename}`, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('Previous file deleted!');
    });
    
  }

  res.status(200).send(successResponse(user))
});


export default  router;