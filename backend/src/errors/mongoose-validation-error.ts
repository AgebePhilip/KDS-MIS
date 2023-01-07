import {CustomError} from './custom-error'

export class MongooseBadRequestError extends CustomError{
   public readonly statusCode: number = 400;

   constructor(public message: string, public err:{message:string, error_code?:string}[]){
     super(message)
     Object.setPrototypeOf(this, MongooseBadRequestError.prototype);
   }
   public sequalizeErrors() {
    
     return {
       status:'error',
       errors:this.err
     }
   }
}