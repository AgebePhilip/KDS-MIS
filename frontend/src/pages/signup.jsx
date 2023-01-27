
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useUser from '../hooks/useAuth';
import useLoader from '../hooks/useLoader';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/useRequest';


function Copyright(props) {
  return (
    <>
    
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Kaduna State, SCI MIS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </>
  );
}

const theme = createTheme();

export default function SignUp() {

  const setUserData = useUser(state => state.setUserData);
  
  const [Loader, showLoader, HideLoader]  = useLoader()
  const [ successNotification] = useNotification();
  const navigate = useNavigate()

  const [doRequest] = useRequest({
    url:'/users/signup',
    method: 'post',
    onSuccess: (data) => {
      successNotification("Successfully Signed up", "Registered")
      setUserData(data)

      //Always evaluate to true
      if(!data.isVerified){
        navigate('/verify')
        return
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



  return (
    
    <ThemeProvider theme={theme}>
      {Loader}
      <Container component="main" maxWidth="xs" style={{width:"100vw",height:'100vh'}}>
        
        <Box
        
          sx={{
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          

            
            
            
           
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#f41111' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <div style={{borderRadius:'4rem'}}>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}
         
          >
            
            
          {/*<TextField
              margin="normal"
              required
              fullWidth
              id="FullName"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              color='success'
              
        /> 
        */}
            
             <TextField
              margin="normal"
              required
              fullWidth
              id="number"
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

            {/*<TextField
              margin="normal"
              required
              fullWidth
              name="  password"
              label="Comfirm Password"
              type="password"
              id="Comfirm password"
              autoComplete="current-password"
              color='success'
            />
            */}
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link href={'/login'} variant="body2">
                  {"already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </div>
        </Box>
        <Copyright sx={{ mt: 4, mb: 2 }} />
      </Container>
    </ThemeProvider>
    
    
  );
}
