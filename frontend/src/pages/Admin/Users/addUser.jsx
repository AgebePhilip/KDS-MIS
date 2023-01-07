import  React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import useLoader from '../../../hooks/useLoader';
import useNotification from '../../../hooks/useNotification';
import AlertDialogSlide from '../../../components/Dialog/dialog';
import useRequest from '../../../hooks/useRequest';
import { Grid, MenuItem } from '@mui/material';
import useUsers from '../../../hooks/useUser';
import { Roles } from '../../../helpers/user-types';

const initial = {
  userType:Roles.user,
  firstName:"",
  lastName:"",
  phone:"",
  email:"",

}

export default function AddUser({open, setOpen}) {

  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const addUser  = useUsers(state=>state.addUser)
  const [editData, setEditDate] = useState(initial)

  const [addUserRequest] = useRequest({
    url:'/users/add',
    method:'post',
    body:undefined,
    onSuccess:(data) => {
      addUser(data)
      console.log(data);
      successNotification(data?.message, "User added")
    }
  })




  

  const handleChange = (e)=>{
    e.preventDefault();

    const name = e.target.name
    setEditDate({
      ...editData,
      [name]:e.target.value
    }) 

  }

  const handleClose = async (e) => {
        
    if(e.target.type === 'button') {
     try {
      showLoader()

      await addUserRequest(editData)
     } catch (error) {

      const errors = error.response.data?.errors

      for(const err of errors){
        warningNotification(err.message)
     }
    }
    }
    HideLoader()
    setEditDate(initial)
    setOpen(false);
  };


  return (
    <>
      {Loader}
      <AlertDialogSlide
            open={open}
            handleClose={handleClose}
            title="Add New User"
            description="use the new category use the new category use the new category"
            button_text="Add User"
            >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            value={editData?.firstName}
            onChange={handleChange}
            color='success'
            size='small'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            value={editData?.lastName}
            onChange={handleChange}
            color='success'
            size='small'
          />
        </Grid>
        <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              type={'email'}
              label="Email Address"
              value={editData?.email}
              onChange={handleChange}
              color='success'
              size='small'
            />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone Number"
            value={editData?.phone}
            onChange={handleChange}
            color='success'
            size='small'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="userType"
            label="userType"
            type="userType"
            id="userType"
            value={editData?.userType}
            onChange={handleChange}
            autoComplete="userType"
            color='success'
            select
            size='small'
          >
            <MenuItem value={Roles.user}>{Roles.user}</MenuItem>
            <MenuItem value={Roles.catmod}>{Roles.catmod}</MenuItem>
            <MenuItem value={Roles.bookmod}>{Roles.bookmod}</MenuItem>
            <MenuItem value={Roles.admin}>{Roles.admin}</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>

        </Grid>
        </Grid>
        </AlertDialogSlide>
    </>
  );
}
