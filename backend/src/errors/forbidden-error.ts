
import {CustomError} from './custom-error'

export class ForbiddenError extends CustomError {
  public readonly statusCode: number = 403;
  constructor(message: string, public error_code?:string) {
    super(message, error_code);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
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