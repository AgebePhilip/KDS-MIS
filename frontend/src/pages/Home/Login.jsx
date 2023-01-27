import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
        Kaduna State, SCI MIS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const setUserData = useUser(state => state.setUserData);

  //dialog control
  const [open, setOpen] = React.useState(false);

  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const [doRequest] = useRequest({
    url:'/users/signin',
    method: 'post',
    onSuccess: (data) => {

      successNotification("Logged in successfully", "Logged In")
      setUserData(data)

      if(!data.isVerified){
        navigate('/verify')
        return
      }
      if(data.userType === "user") {
        navigate('/')  
        }else{
        navigate('/dashboard')
      }
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      remember: data.get('remember'),
    });

    
    await doRequest({ email:data.get('email'), password:data.get('password')})
  
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
       successNotification(response.data?.data?.message, "Email Sent")
       navigate('/verify_token')
       return;

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
          
          <Avatar sx={{ m: 1, bgcolor: '#f41111' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color='success'
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color='success'
            />
            <FormControlLabel
              control={<Checkbox value="remember" name="remember" color="success" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={handleClickOpen}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={`/signup`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
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
