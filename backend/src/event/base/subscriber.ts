import { Subjects } from "../subjects";
import {RedisClientType} from 'redis'

interface Message{
  channel: Subjects;
  data:any
}

export abstract class Subcriber<T extends Message>{

  abstract channel: T['channel'];
 
  protected redis_client: RedisClientType;

  abstract onMessage(data:T['data']):void

  constructor(redis_client: RedisClientType){
     this.redis_client = redis_client.duplicate();
  }

 async subscribe(){
    await this.redis_client.connect();

    await this.redis_client.subscribe(this.channel, (message:T['data']) => {

      console.log(`Message Received on channel: ${this.channel}`);

      const parseMessage = this.parseMessage(message)

       this.onMessage(parseMessage)
      console.log(message); // 'message'
    });
    console.log("Subcriber listenning");
  }
  parseMessage(message: T['data']){

    const data = message;

    if(typeof data === 'string'){
      return JSON.parse(data);
    }
    return JSON.parse(data.toString('utf8'));
  }
}