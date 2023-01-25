import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/signin.svg";
import Link from '@mui/material/Link';
import bgimg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import useUser from '../hooks/useAuth';
import useLoader from '../hooks/useLoader';
import { useNavigate } from "react-router-dom";
import useNotification from '../hooks/useNotification';
import useRequest from '../hooks/useRequest';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});



const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "30%",
};

const theme = createTheme();



export default function Register() {
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();
  const [Loader, showLoader, HideLoader]  = useLoader()
  const [ successNotification] = useNotification();
  const setUserData = useUser(state => state.setUserData);
  

//to do implement submit data to base 
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


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

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


 
 
 
 
 

  return (
    
    <ThemeProvider theme={theme}>
      {Loader}
      
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed! Enter correct username and password.
        </Alert>
      </Snackbar>

     
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "110vh",
          color: "#f5f5f5",
        }}
      >
         <Typography 
         style={{color:'green',
          fontSize:'2rem', 
          textAlign:'center',
          paddingTop:'3rem',
          fontWeight:'bold',
          marginBottom:'3rem',
          paddingBottom:'4rem'}}>
            KADUNA STATE SOCIAL PROTECTION MANAGEMENT INFORMATION SYSTEM 
            </Typography>
        
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              >
                
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#3b33d5",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "85px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Create Account
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
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
            
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
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
                        </Grid>
                        
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                             type="submit"
                             fullWidth="true"
                            size="large"
                             variant="contained"
                             color="success"
                            sx={{
                              mt: "15px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              
                            }}
                          >
                            Register
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Already have an Account?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/login2");
                                  }}
                              >
                                Sign In
                              </span>
                            </Typography>
                          </Stack>
                         
                        </Grid>
                        
                      </Grid>
                    </Box>
                    
                  </Container>
                </ThemeProvider>
                
              </Box>
            </Grid>
          </Grid>
          <Box>
              
              <Typography style={{textAlign:'center',marginTop:'3rem',color:"green", fontSize:'0.9rem'}}>Supported By</Typography>

              <Typography style={{textAlign:'center',color:'green',fontSize:"0.9rem"}}>The Expanding Social Protection for Inclusive Development (ESPID) Project
with funding from UKAid
</Typography>
            
            </Box>
          <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center',paddingTop:'1.2rem'}}>
            
      <Link>
      <img src="https://ik.imagekit.io/amazonaga12345/STC_Logo_Eng_Stacked_ColPos_RGB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674515619709/100" alt="welcom" style={{width: '40px', height: '40px', borderRadius: '13%',margin: '1rem'}}/>
      </Link>
      
      <Link>
      <img src="https://ik.imagekit.io/amazonaga12345/UKaid.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674515620100" alt="welcom" style={{width: '40px', height: '40px', borderRadius: '30%', margin: '1rem'}}/>
      </Link>
      
      <Link href="/">

      <img src="https://ik.imagekit.io/amazonaga12345/image001.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674515619225" alt="welcom" style={{width: '40px', height: '40px', borderRadius: '40%', margin: '1rem'}}/>
      </Link>
      
    
      <img src="https://ik.imagekit.io/amazonaga12345/ACF_LOGO.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674515619489" alt="welcom" style={{width: '40px', height: '40px', borderRadius: '50%', margin: '1rem'}}/>
    </Box>
        </Box>
        
      </div>
      </ThemeProvider>
     
   
  );
}
