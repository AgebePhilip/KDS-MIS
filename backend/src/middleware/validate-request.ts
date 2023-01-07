import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
 
  const errros = validationResult(req);
  if(!errros.isEmpty()){

    console.log(errros.array(), "here 3");
    
    throw new RequestValidationError(errros.array());
  }

 console.log("came here");
 
  
  next();
}