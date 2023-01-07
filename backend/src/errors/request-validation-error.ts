
import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError{

  public readonly statusCode = 400;

  constructor(private errors: ValidationError[]){
    super("validation error")

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public sequalizeErrors(){
    console.log(this.errors);
    
    const errors = this.errors.map(error => {

      console.log(error, "mesdfcfgc");
      
      return {
        message:error.msg.message,
        error_code:error.msg.error_code,
        field: error.param}
    })
    console.log('here', errors);
    

    return { 
      status:'error',
      errors
    }
  }

}