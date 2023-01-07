import {CustomError} from './custom-error'

export class BadRequestError extends CustomError{
   public readonly statusCode: number = 400;

   constructor(public message: string, public error_code?:string){
     super(message, error_code)
     Object.setPrototypeOf(this, BadRequestError.prototype);
   }
   public sequalizeErrors() {
    
     return {
       status:'error',
       errors:[
          {
          message: this.message,
          error_code:this.error_code
         }
       ]
     }
   }
}