import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import AlertDialogSlide from '../../components/Dialog/dialog';
import useRequest from '../../hooks/useRequest';
import request from '../../api/build-request';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Kaduna State SCI MIS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function VerifyToken() {

  const setUserData = useUser(state => state.setUserData);
  const user = useUser(state => state.user);

  const [email, setEmail] = useState('')

  //dialog control
  const [open, setOpen] = React.useState(false);

  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const navigate = useNavigate()

  const [doRequest] = useRequest({
    url:'/users/verify_token',
    method: 'post',
    onSuccess: (data) => {
      successNotification(data.message, "Email Verified")
      setUserData(data)
      navigate('/change_password')
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()
    const data = new FormData(event.currentTarget);
    console.log({
      otp: data.get('otp'),
    });

    await doRequest({otp:data.get('otp'), key: user.key})
  
    HideLoader()

  };

  
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = async (e) => {
    
    if(e.target.type === 'button') {
     try {
       const response = await request().post('/users/reset_password', {
           email
       })
       setUserData(response.data?.data)
       successNotification(response.data?.data?.message, "Email Sent successfully")

     } catch (error) {

      console.log(error);
        const errors = error.response.data?.errors
    
      for(const err of errors){
        warningNotification(err.message)
     }
    }
    }
    setOpen(false);
  };

 const handleEmailChange = (e) => {
   e.preventDefault()
   const value = e.target.value;
   setEmail(value)
 }



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
            Enter the OTP  code sent to your email
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="OTP CODE"
              label="OTP CODE"
              name="otp"
              type={'number'}
              autoComplete="otp"
              autoFocus
              color='success'
              size='small'
              onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
            }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
            Enter the OTP Code
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  onClick={handleClickOpen}
                  color="primary"
                >
                  resent code
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <AlertDialogSlide
       open={open}
       handleClose={handleClose}
       title=" Verify Your Email Address"
       description="Please enter your email address through which a verification code will be sent"
       button_text="Send"
      >
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
        />
      </AlertDialogSlide>
    </ThemeProvider>
  );
}
