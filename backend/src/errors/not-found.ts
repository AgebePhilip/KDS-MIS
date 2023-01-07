import { CustomError } from './custom-error'

export class NotFoundError extends CustomError{
   public readonly statusCode = 404;
   
   constructor(public message:string="Route not found", public error_code?:string){
    super(message, error_code)

    Object.setPrototypeOf(this, NotFoundError.prototype);
   }

   public sequalizeErrors() {
     return { 
      status:'error',
      errors:[
        {
          message: this.message,
          error_code: this.error_code
        }
       ]
     }
   }

}