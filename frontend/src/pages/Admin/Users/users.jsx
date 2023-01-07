import React, {useEffect, useCallback} from 'react';
import {
  Box,
  Button,
  Divider,
  Grid, 
  Stack, 
  } from '@mui/material';

  import { Add, Edit, Delete } from '@mui/icons-material';

import DataTable from '../../../components/Table/TableData';
import { useConfirm } from 'material-ui-confirm';
import { canAccess } from '../../../helpers/access';
import { Roles } from '../../../helpers/user-types';
import useUser from '../../../hooks/useAuth';
import useRequest from '../../../hooks/useRequest';
import AddUser from './addUser';
import useUsers from '../../../hooks/useUser';
import useNotification from '../../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';

  const Users = () =>{

  const confirm = useConfirm() 
  const user = useUser(state => state.user);
  const users = useUsers(state=> state.users);
  const fetchALLUsers  = useUsers(state => state.fetchALLUsers);
  const deleteUser = useUsers(state => state.deleteUser);
  const [warningNotification, successNotification] = useNotification();
  const navigate = useNavigate();
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
   {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 170,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'phone', width: 200 },
  { field: 'userType', headerName: 'User Type', width: 200 },
  { field: 'suspended', type:"boolean",  headerName: 'Suspended Status', width: 200 },
  { field: 'isVerified', type:"boolean",  headerName: 'Verificat Status', width: 200 }, 
  { field: 'subscribed', type:"boolean",  headerName: 'Subscribed', width: 200 }, 
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

            try {
             deleteRequest({}, undefined, undefined, `/users/${currentRow.id}`)
            } catch (error) {
              console.log(error);
            }
           })
           .catch(() => {
 
           })
         };
         const handleEdit = (e) => {
           const currentRow = params.row;

           navigate('/dashboard/users/edit', {state:currentRow})
 
         };
         
         return (
            <Stack direction="row" spacing={2}>
              <Button startIcon={<Edit/>} fullWidth variant="outlined" color="info" size="small" onClick={handleEdit}>Edit</Button>
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
        fetchALLUsers()
  
      }, [fetchALLUsers])

      useEffect(()=>{
      try {
        callback()
      } catch (error) {
        console.log(error);
      }
      }, [callback])

      const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
      };



    return(
      <>
        <Box sx={{ flexGrow: 0 }}>
          <Grid marginBottom={3} container justifyContent="flex-end">
            <Button 
                variant='contained' 
                color="info"
                onClick={handleClickOpen}
                startIcon={<Add/>}
                >
                  ADD USER
            </Button>
            <Divider />
          </Grid>
          <DataTable row={users} columns={columns} />
        </Box>
        <AddUser
         open={open}
         setOpen={setOpen}
        />
      </>
    )
}

export default  Users