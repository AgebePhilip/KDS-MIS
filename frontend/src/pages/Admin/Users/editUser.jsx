import React, {useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Container, CssBaseline, Grid, MenuItem, TextField } from '@mui/material';
import { Roles } from '../../../helpers/user-types';
import useLoader from '../../../hooks/useLoader';
import useNotification from '../../../hooks/useNotification';
import { useLocation, useNavigate } from 'react-router-dom';
import useRequest from '../../../hooks/useRequest';
import useUsers from '../../../hooks/useUser';


const theme = createTheme();

const EditUser = () =>{


  const location = useLocation();
  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification] = useNotification();
  const [editData, setEditDate] = useState(location.state)
  const editUser  = useUsers(state=>state.editUser)
  const  navigate = useNavigate();
  

  const [doRequest] = useRequest({
    url:undefined,
    method:'put',
    body:undefined,
    onSuccess:(data) => {
      editUser(data)
      navigate('/dashboard/users')
      console.log(data);
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


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(editData);
  
    try {
      showLoader()
       doRequest(editData, undefined, undefined, `/users/${editData.id}/admin`)
     } catch (error) {

      const errors = error.response.data?.errors

      for(const err of errors){
        warningNotification(err.message)
     }

    }
    HideLoader()
  }

  


  return(
    <>
    <ThemeProvider theme={theme}>
      {Loader}
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          name="isVerified"
          label="Verification Status"
          type="isVerified"
          id="isVerified"
          value={editData?.isVerified}
          onChange={handleChange}
          autoComplete="isVerified"
          color='success'
          select
          size='small'
        >
          <MenuItem value={"false"}>False</MenuItem>
          <MenuItem value={"true"}>True</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6}>
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="subscribed"
          label="Subcription Status"
          type="subscribed"
          id="subscribed"
          value={editData?.subscribed}
          onChange={handleChange}
          autoComplete="subscribed"
          color='success'
          select
          size='small'
        >
          <MenuItem value={"false"}>False</MenuItem>
          <MenuItem value={"true"}>True</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="suspended"
          label="Suspended Status"
          type="suspended"
          id="suspended"
          value={editData?.suspended}
          onChange={handleChange}
          autoComplete="suspended"
          color='success'
          select
          size='small'
        >
          <MenuItem value={"false"}>False</MenuItem>
          <MenuItem value={"true"}>True</MenuItem>
        </TextField>
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
          <MenuItem value={Roles.lecturer}>{Roles.lecturer}</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6}>

      </Grid>
      </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="success"
        >
          Update User
        </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default EditUser;