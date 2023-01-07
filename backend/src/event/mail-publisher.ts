import {MailMessage} from './types/mail-message'
import {Publisher} from './base/publisher'
import { Subjects } from './subjects';


export class MailMessagePublisher extends Publisher<MailMessage>{
  channel: Subjects = Subjects.emailMesaage;
}
