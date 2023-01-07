import {Schema, model, Model, HydratedDocument}  from "mongoose";
import { Password } from "../services/Password";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import { Roles } from "../helper/role";

interface UserI {
  email: string;
  password: string;
  userType:string;
  firstName?:string;
  lastName?:string;
  phone?:string;
  expiresAt?: Date,
  subscribed?:boolean;
  profile?:string;
  suspended?:boolean;
  isVerified?:boolean;
}

interface UserModel extends Model<UserI> {
  createUser(user:UserI): HydratedDocument<UserI>;
  findByEmail(email:string): Promise<HydratedDocument<UserI>>;
}


const userSchema = new Schema<UserI, UserModel>({
  email:{
    type: String,
    required: [true, "email must be provided"]
  },
  password:{
    type: String,
    required: [true, "password must be provided"]
  },

  firstName:{
    type: String,
    default:""
  },
  lastName:{
    type: String,
    default:""
  },
  phone:{
    type: String,
    default:""
  },
  userType:{
    type:String,
    required:[true, 'userType must be provided'],
    enum:{
      values:Object.values(Roles),
      message: '{VALUE} is not a valid role'
    },
    default:Roles.user
  },
  suspended:{
    type: Boolean,
    required: false,
    default: false
  },
  isVerified:{
    type: Boolean,
    required: false,
    default: false 
  },
  subscribed:{
    type: Boolean,
    required: false,
    default: false
  },
  profile:{
    type: String,
    default: "" 
  },
  expiresAt:{
    type: Schema.Types.Date,
    required: false,
  },
},
{ 
  timestamps:true,
  toJSON:{
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      delete ret.password;
    },
  }

}
)

userSchema.statics.createUser = (user:UserI) =>{
  return new User(user)
}

userSchema.statics.findByEmail = async function(email:string){
    return this.findOne({email})
}

userSchema.pre('save', async function(){
   if(this.isModified('password')){
    const hash = await Password.toHash(this.get('password'));
    this.set('password', hash);
   }
})

userSchema.plugin(mongoosePagination);

//const  = mongoose.model<User, Pagination<User>>("User", userSchema);


const User: Pagination<UserI> = model<UserI, Pagination<UserI>>("User", userSchema);


export {User};

