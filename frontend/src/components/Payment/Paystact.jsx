import React,{ useState } from 'react';
import { Button, Chip } from '@mui/material';
import { usePaystackPayment } from 'react-paystack';
import { Payment } from '@mui/icons-material';
import useUser from '../../hooks/useAuth';
import useRequest from '../../hooks/useRequest';
import useTransaction from '../../hooks/useTransaction';
import useNotification from '../../hooks/useNotification';
import moment from 'moment';


const PaystackPayment = () => {
  const user = useUser(state => state.user);
  const setUserData = useUser(state => state.setUserData);
  const [ref, setRef] = useState((new Date()).getTime().toString())
  const [warningNotification, successNotification] = useNotification();
  const addTransaction = useTransaction(state => state.addTransaction);

  const [validateRequest] = useRequest({
    url:'/transactions',
    method:'post',
    body:undefined,
    onSuccess:(data) => {
      console.log("data", data);
      setUserData(data?.user)
      addTransaction(data?.transaction)
      successNotification("Payment successfully verified", "Payment success")
    }
  })

  const config = {
    reference:ref,
    email: user.email,
    amount: 20000, //Amount 200 in kobo
    metadata:{
      userId:user.id
    },
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    
    };
    // you can call this function anything
    const onSuccess = (reference) => {
      // Implementation for whatever you want to do with reference and after success call.
    
     validateRequest({transactionID:reference.reference}, {'cache-control': 'no-cache'})
     .catch((error)=>{console.log(error);})

    };

    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);

    const handlePayment = (e)=>{
      e.preventDefault();
      console.log("new Ref", ref);
      setRef((ref)=> (new Date()).getTime().toString())
      initializePayment(onSuccess, onClose)
    }

    console.log(navigator.onLine);

    return (
      <>

      {
        user?.expiresAt? ( <Chip
          label={`${moment(user?.expiresAt).diff(moment(), 'days')} days left`}
          variant='filled'
          color='warning'
        />
          
        ) : <Button 
              variant='contained' 
              color="info"
              onClick={handlePayment}
              startIcon={<Payment/>}
              >
              Subscribe Now
          </Button>
      }
 
      </>
    );
};


export default PaystackPayment;