import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/notAuthorized";
import { error_codes } from "../helper/util/error-codes";


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
 
  if(!req.currentUser){
     throw new NotAuthorizedError('Not authorized', error_codes.unauthorized);
  }
  next();
}