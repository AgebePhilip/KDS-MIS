import React, {useEffect, useCallback} from 'react';
import {
  Box,
  Button,
  Divider,
  Grid, 
  Stack, 
  } from '@mui/material';

  import {Delete } from '@mui/icons-material';

import DataTable from '../../../components/Table/TableData';
import { useConfirm } from 'material-ui-confirm';
import { canAccess } from '../../../helpers/access';
import { Roles } from '../../../helpers/user-types';
import useUser from '../../../hooks/useAuth';
import useRequest from '../../../hooks/useRequest';
import AddUser from './addUser';
import useUsers from '../../../hooks/useUser';
import useNotification from '../../../hooks/useNotification';
import moment from 'moment';
import useTransaction from '../../../hooks/useTransaction';

  const Subscription = () =>{

  const confirm = useConfirm() 
  const user = useUser(state => state.user);
  const deleteUser = useUsers(state => state.deleteUser);
  const [warningNotification, successNotification, info] = useNotification();
  
  const transactions = useTransaction(state=> state.transactions);
  const fetchTransactions  = useTransaction(state => state.fetchTransactions);

  //dialog control
  const [open, setOpen] = React.useState(false);

  const [deleteRequest] = useRequest({
    url:undefined,
    method:'delete',
    body:undefined,
    onSuccess:(data) => {
      console.log("data", data);
      deleteUser(data)
      console.log(data);
      successNotification(data.email, "User Deleted")
    }
  })


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
    },
  {
     field: 'action',
     headerName: 'Action',
     width: 210,
     sortable: false,
     disableClickEventBubbling: true,
     renderCell: (params) => {
         const handleDelete = (e) => {
           const currentRow = params.row;
           confirm({
             description:`You are about to delete ${currentRow.email}`,
             confirmationText:"Yes",
           })
           .then(() => {

            info("Sorry this functionality is not allowed", "Not Allowed")
           /** try {
             deleteRequest({}, undefined, undefined, `/users/${currentRow.id}`)
            } catch (error) {
              console.log(error);
            }
            */

           })
           .catch(() => {
 
           })
         };
         
         return (
            <Stack direction="row" spacing={2}>
              {
                canAccess(
                  [Roles.admin],
                  user.userType,
                  <Button startIcon={<Delete/>} fullWidth variant="outlined" color="error" size="small" onClick={handleDelete}>Delete</Button>
                )
              }
              
            </Stack>
         );
     },
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
            {/** 
            <Button 
                variant='contained' 
                color="info"
                onClick={handleClickOpen}
                startIcon={<Add/>}
                >
                  ADD USER
            </Button>
          */}
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

export default  Subscription