import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Transaction } from '../../../models/Transactions';
import { successResponse } from '../../../helper/success-response';
import { requireAuth } from '../../../middleware/require-auth';
import { Roles } from '../../../helper/role';
import { body } from 'express-validator';
import { validateRequest } from '../../../middleware/validate-request';
import buildRequest from '../../../helper/build-request';
import { BadRequestError } from '../../../errors/bad-request-error';
import { error_codes } from '../../../helper/util/error-codes';
import { User } from '../../../models/userModel';
import { isDateValid, numberOfDayToExpiry } from '../../../helper/dateHelper';


const router = Router();

router.post('/', 
  requireAuth,
   [
    body('transactionID')
    .trim()
    .notEmpty()
    .withMessage({message:'transactionID must be provided'}),
  ],
  validateRequest,
 async (req: Request, res: Response) => {

  const currentUser = req.currentUser
  const {transactionID} = req.body;

  
  const oldTransaction =  await Transaction.findOne({transactionId:transactionID});

  if(oldTransaction){
    throw new BadRequestError("Transaction Referece Already used", error_codes.invalid_payment);
  }

  try {


  const paymentInfo = await buildRequest.get(`/transaction/verify/${transactionID}`)
  const defaultAmount = parseInt(process.env.AMOUNT as string, 10);
  const { data } = paymentInfo.data;

  const isPaymentValid = data.amount === defaultAmount;

  if(!isPaymentValid){
    throw new BadRequestError("Invalid payment amount", error_codes.invalid_payment);
  } 
  const user = await User.findById(currentUser?.id);

  if(!user){
    throw new BadRequestError("Invalid User ID", error_codes.invalid_input);
  }

  const isValid = isDateValid(user.expiresAt);

  if(isValid){
    
    const oldDate = user.expiresAt!.toDateString()
    console.log(user.expiresAt, oldDate, new Date(oldDate));
    user.expiresAt = numberOfDayToExpiry(new Date(oldDate))
  }else{
    user.expiresAt = numberOfDayToExpiry(new Date());
  }

  const transaction =  Transaction.createTransaction({
    user: new mongoose.Types.ObjectId(user.id),
    amount: (data.amount / 100),
    valid: true,
    email: data.customer.email,
    transactionId: data.reference,
  })

  if(transaction.email !== user.email){
    throw new BadRequestError("Login user and transaction email does not match", error_codes.invalid_input);
  }

  user.subscribed = true;

  await user.save()
  await transaction.save();


  res.status(200).send(successResponse({user, transaction})) 

  } catch (error) {

    throw error
    console.log(error);
  }
    
})


export default router;