import {MailMessage} from './types/mail-message'
import {Subcriber} from './base/subscriber'
import { Subjects } from './subjects';
import { sendMail } from '../helper/send-mail';


export class MailMessageSubscriber extends Subcriber<MailMessage>{
   channel: Subjects = Subjects.emailMesaage;

  async onMessage(data:MailMessage['data']){
   //  console.log("coming here again", data);
   try {
      await sendMail(data.to, data.subject, {data:data.data});
   } catch (error) {
     throw error  
   }
           
   }
}


