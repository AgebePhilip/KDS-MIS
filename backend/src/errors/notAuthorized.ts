
import {CustomError} from './custom-error'

export class NotAuthorizedError extends CustomError {
  public readonly statusCode: number = 401;
  constructor(message: string, public error_code?:string) {
    super(message, error_code);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  sequalizeErrors(){
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