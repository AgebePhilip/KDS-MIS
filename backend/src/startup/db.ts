import mongoose from 'mongoose';
import {Application} from 'express'
import { redis_client } from './redis-config';
import { MailMessageSubscriber } from '../event/mail-subcriber';

export const startup = async(app: Application) =>{
  if(!process.env.JWT_KEY ){
    throw new Error('JWT_KEY is required')
  }
  if(!process.env.Mongo_URI){
    throw new Error('Mongo_URI is required')
  }
  if(!process.env.Redis_URI){
    throw new Error('Redis_URI is required')
  }

  try {

   //connecting to redis server
  await redis_client.connect(process.env.Redis_URI);

  redis_client.client.on("error", function(error) {
    console.error(error);
    //report it to my log
  })

  //maillSubscriber
  new MailMessageSubscriber(redis_client.client).subscribe();

  await mongoose.connect(process.env.Mongo_URI)
    console.log("connected to mongodb");
     
  } catch (error) {
    console.log(error);
    
  }

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, ()=>{
    console.log(`Listenning on port ${PORT}!!!`);
  });

}