import React, {useEffect, useCallback} from 'react';
import {
  Box,
  Button,
  Divider,
  Grid, 
  Stack, 
  } from '@mui/material';

  import { Add, Edit, Delete } from '@mui/icons-material';

import DataTable from '../components/Table/TableData';
import { useConfirm } from 'material-ui-confirm';
import { canAccess } from '../helpers/access';
import { Roles } from '../helpers/user-types';
import useUser from '../hooks/useAuth';
import useRequest from '../hooks/useRequest';
import AddUser from './Admin/Users/addUser';
import useUsers from '../hooks/useUser';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import PaystackPayment from '../components/Payment/Paystact';
import useTransaction from '../hooks/useTransaction';
import moment from 'moment';

  const Plans = () =>{

  const transactions = useTransaction(state=> state.transactions);
  const fetchTransactions  = useTransaction(state => state.fetchTransactions);


  //dialog control
  const [open, setOpen] = React.useState(false);

  const columns = [
  { field: 'id', headerName: 'ID', hide:true},
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'transactionId', headerName: 'Transaction ID', width: 200 },
  { field: 'amount', headerName: 'Amount', type: "number",  width: 200 },
  { field: 'valid', type:"boolean",  headerName: 'Payment Status', width: 200 },
  { field: 'createdAt',
     type:"date",  
     headerName: 'Date Paid', 
     width: 200,
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  }
 ];
    
    const  callback = useCallback( async()=>{
        fetchTransactions()
  
      }, [fetchTransactions])

      useEffect(()=>{
      try {
        callback()
      } catch (error) {
        console.log(error);
      }
      }, [callback])


    return(
      <>
        <Box sx={{ flexGrow: 0 }}>
          <Grid marginBottom={3} container justifyContent="flex-end">
            { /**<PaystackPayment /> */ }
            <PaystackPayment />
            <Divider />
          </Grid>
          <DataTable row={transactions} columns={columns} />
        </Box>
        <AddUser
         open={open}
         setOpen={setOpen}
        />
      </>
    )
}

export default  Plans