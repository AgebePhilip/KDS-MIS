import { NextFunction, Request, Response } from 'express';


import {JWT, JWT_Data} from '../services/Jwt'


//to add currentUser to the existing interface
declare global{
  namespace Express{
    interface Request{
       currentUser?: JWT_Data
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {

  if(!req.session?.jwt)
    return next();
  
  try {
    const payload = await JWT.verifyToken(req.session.jwt)
      req.currentUser = payload;
     } catch (error) {
  }
  next();
}