import { customAlphabet } from 'nanoid'
import {randomUUID} from 'crypto'


const EXPIRATION_WINDOW_SECONDS = 30 * 60;
//Creating an expirations time in seconds for 30min
const expirationTime = new Date()
expirationTime.setSeconds(expirationTime.getSeconds() + EXPIRATION_WINDOW_SECONDS);


export class GenerateToken {
  static  otp():string{
    const nanoid = customAlphabet('123456789', 6)
    return nanoid()
  } 
  static generateKey():string{
    return randomUUID()
  }

  static expireAt():{seconds:number, time:Date}{
    const expires = new Date(expirationTime);
    const timeInSeconds = Math.ceil((expires.getTime() - new Date().getTime()) / 1000);
    console.log(expirationTime)
    console.log(expires)
    console.log(timeInSeconds)
    return {seconds:timeInSeconds, time: expirationTime}
  }

}