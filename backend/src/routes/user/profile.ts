import {Request, Response, Router} from 'express'
import { param} from 'express-validator';
import {User} from '../../models/userModel';
import fs  from 'fs';
import path from 'path';
import multer from  'multer';
import {upload} from '../../middleware/multi-storage';
import { requireAuth } from '../../middleware/require-auth';
import { validateRequest } from '../../middleware/validate-request';
import { NotFoundError } from '../../errors/not-found';
import { successResponse } from '../../helper/success-response';

const upload_UserStorage = multer.diskStorage(upload('public/users/profile'))
const upload_User = multer({storage:upload_UserStorage});

const router = Router()

router.put('/:id/profile',
    requireAuth,
    [
    param('id')
      .isString()
      .trim()
      .withMessage({message:'id must be provided'}),
  ], 
  validateRequest,
  upload_User.fields([{name:'profile', maxCount: 1}]),
  async (req: Request, res:Response) => {


    const user = await User.findOne({_id: req.params.id});

    if(!user){
      throw new NotFoundError("User not found");
    }

    const files= req.files as  {[fieldname: string]: Express.Multer.File[]};

    const image =files['profile'][0].filename;

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
 
    user.profile = `${req.protocol}://${req.headers.host}/users/profile/${image}`; 
    await user.save();
  
  res.status(200).send(successResponse(user))
});





export default  router;