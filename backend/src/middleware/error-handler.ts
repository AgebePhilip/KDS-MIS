import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';

import {CustomError} from '../errors/custom-error';
import { NotFoundError } from '../errors/not-found';


export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  
   if(err instanceof CustomError){
    return res.status(err.statusCode).send(err.sequalizeErrors())
   }

   if(err instanceof mongoose.Error.ValidationError){
    const keys = Object.keys(err.errors);
   const result = keys.map(key =>{
      return {
        message: err.errors[key].message,
        error_code: `invalid_${err.errors[key].path}`
      }
    }) 
   return res.status(400).send({
     status:"error",
     data:result
   })
   }

   console.log(err);
   
 
   
    res.status(400).send({
      message: 'Sample message'
    })
    
}

export const notFoundHandler = async (req: Request, res: Response, next: NextFunction) =>{
  throw new NotFoundError();
}