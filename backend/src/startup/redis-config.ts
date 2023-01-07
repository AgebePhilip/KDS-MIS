
import {createClient, RedisClientType} from 'redis';

class Redis {
  private _client?:RedisClientType;
  
  public get client(){
    if(!this._client){
      throw new Error('Redis must be initialize');
    }
    return this._client;
  }

  public async set(key:string, value:string){
     await this.client.set(key,value);
  }
  public async get(key:string){
    return this.client.get(key);
 }
 public async clear(key:string, seconds:number){
   await this.client.expire(key, seconds);
}
 async connect(url: string){
    this._client =  createClient({
        url
      });
     await this._client.connect()
    
    console.log("connected to redis server");
  }
}

const redis_client = new Redis();

export {redis_client}
