import { Router, Request, Response } from 'express';
import { Transaction } from '../../../models/Transactions';
import { successResponse } from '../../../helper/success-response';
import { requireAuth } from '../../../middleware/require-auth';
import { Roles } from '../../../helper/role';


const router = Router();

router.get('/', requireAuth, async (req: Request, res: Response) => {

  const user = req.currentUser
  let transactions:any;

  if(user?.userType === Roles.admin){
    transactions =  await Transaction.find({});
  }else if(user?.userType === Roles.user){
    transactions =  await Transaction.find({user: user.id});
  }else{
    transactions = [];
  }
  
  res.status(200).send(successResponse(transactions))     

})


export default router;