import {promisify} from 'util'
import jwt from 'jsonwebtoken'


const signAsync = promisify(jwt.sign)


export interface JWT_Data {
  id: string,
  email: string,
  userType: string,
  subscribed?: boolean,
  exp?:number,
}

const secret = process.env.JWT_KEY!;

export class JWT {
  static async getToken(data:JWT_Data): Promise<string>{
    const token  = (await signAsync(data, secret)) as string;
    return token
  }

  static async verifyToken(token:string):Promise<JWT_Data>{

  return new Promise((resolve, reject)=>{

    jwt.verify(token,secret,function(err, decoded){
      if(err)
         reject(err);

     resolve(decoded as JWT_Data);
   });

  })
  }
}