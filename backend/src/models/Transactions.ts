import {Schema, model, Model, HydratedDocument, Types}  from "mongoose";

interface TransactionI {
  user: Types.ObjectId;
  amount: number;
  transactionId: string;
  valid: boolean;
  email:string;
  createdAt?:string;
  updatedAt?:string;
}

interface TransactionModel extends Model<TransactionI> {
  createTransaction(transaction:TransactionI): HydratedDocument<TransactionI>;
  findByTransactionId(transactionId:string): Promise<HydratedDocument<TransactionI>>;
}

const transactionSchema = new Schema<TransactionI, TransactionModel>({

  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "user ID must be provided"]
  },
  email:{
    type: String,
    required:[true, "email must be provided"]
  },
  transactionId:{
    type: String,
    unique: true,
    required:[true, "transaction ID must be provided"]
  },
  amount:{
    type: Number,
    required:[true, "amount ID must be provided"]
  },
  valid:{
    type: Boolean,
    required:[true, "Valid status must be provided"]
  }
 },
{ 
  timestamps:true,
  toJSON:{
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    },
  },
  versionKey:"version",
  optimisticConcurrency:true,
}
)

transactionSchema.statics.createTransaction = (transaction:TransactionI) =>{
  return new Transaction(transaction)
}

transactionSchema.statics.findByTransactionId = async function(transactionId:string){
   return  this.findOne({transactionId})
}


const Transaction = model<TransactionI, TransactionModel>("Transaction", transactionSchema);

export {Transaction};

