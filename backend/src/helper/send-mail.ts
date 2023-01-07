import nodemailer from 'nodemailer';
import pug from 'pug';


const sendMail = async (to:string, subject:string, data:{[key: string]:any})=>{
       
      
       try {
        const html = pug.renderFile(`${__dirname}/../views/emails/message.pug`, data);

        console.log(html);



 
        const secure = process.env.MAIL_SECURE === 'true' ? true : false;
        const Port  = process.env.MAIL_PORT;
         let transporter = nodemailer.createTransport({
            secure,
            host:  process.env.MAIL_HOST,
            port: parseInt(Port as string, 10),
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASSWORD
            }
         })
 
         let mailOptions = {
             from: "litebox11@gmail.com",
             to: to,
             subject: subject,
             html: html
           };
          
     // send mail with defined transport object
     let info = await transporter.sendMail(mailOptions);
   
     console.log("Message sent: %s", info.messageId, info);
     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
       } catch (error) {
          console.log(error);
         
       }
 
}
export { sendMail }
