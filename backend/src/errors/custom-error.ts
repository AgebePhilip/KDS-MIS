
export abstract class CustomError extends Error{
    abstract statusCode: number;
    constructor(public message: string, public error_code?:string){
      super(message);
      Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract sequalizeErrors(): {
        status:string;
        errors:{
          message: string;
          field?: string;
          error_code?: string
        }[]
    };
}