import {Subjects} from '../subjects';
export interface MailMessage{
  channel: Subjects.emailMesaage,
  data:{
    to:string,
    subject:string
    data:{[key:string]:any}
  }
}