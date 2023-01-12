import  React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useUser from '../../hooks/useAuth';
import useLoader from '../../hooks/useLoader';
import useNotification from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Kaduna State SCI. MIS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ChangePassword() {

  const setUserData = useUser(state => state.setUserData);
  const user = useUser(state => state.user);


  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const navigate = useNavigate()

  const [doRequest] = useRequest({
    url:'/users/change_password',
    method: 'post',
    onSuccess: (data) => {
      successNotification(data.message, "Password Changed")
      setUserData({key:undefined})
      navigate('/login')  
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password'),
    });
    if(data.get('password') !== data.get('confirm_password')){
      warningNotification("password does not match", "Password not match")

    }else{
      await doRequest({ password:data.get('password'), key: user?.key})
    }
    
    HideLoader()

  };

 useEffect(()=>{


     if(!user){
      warningNotification("Please verify your email address by clicking forgot password", "Verify email")
      navigate('/login')
      return
     } 
     if(!user?.key){
      warningNotification("Please verify your email address by clicking forgot password", "Verify email")
      navigate('/login')
      return
     }
     if(user?.key === ''){
      warningNotification("Please verify your email address by clicking forgot password", "Verify email")
      navigate('/login')
      return
     }

     console.log("valid", user,  user?.key);
  },[])

  return (
    <ThemeProvider theme={theme}>
      {Loader}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Enter Your New Password Details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="new_password"
              label="New Password"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
              color='success'
              size='small'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm_password"
              label="Confirm Password"
              name="confirm_password"
              type="password"
              autoComplete="password"
              autoFocus
              color='success'
              size='small'
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              Change Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
