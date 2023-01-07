
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError{

  public readonly statusCode = 500;
  
  constructor(private reason: string, public error_code?:string){
    super(reason, error_code);

    this.reason= reason;
    this.error_code= error_code;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  public sequalizeErrors(){
    return {
      status:'error',
      errors:[
        {
          message: this.reason,
          error_code: this.error_code
        }
      ]
    }
  }
}