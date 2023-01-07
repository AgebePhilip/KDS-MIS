import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/forbidden-error";
import { NotAuthorizedError } from "../errors/notAuthorized";
import {error_codes} from '../helper/util/error-codes';
import {Roles} from '../helper/role'


export const permission = (...permissions:Roles[]) =>{
  return (req: Request, res: Response, next: NextFunction) => {
    
    if(!req.currentUser){
      throw new NotAuthorizedError('Not authorized');
   }

   const user = req.currentUser;
   const role = user.userType as Roles;

   if(!permissions.includes(role)){
    throw new ForbiddenError('Your don\'t have permission to access this resource.', error_codes.permission_error);
   }
   next();
  }
}
