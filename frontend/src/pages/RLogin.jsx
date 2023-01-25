import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/signin.svg";
import bgimg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";


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
  left: "37%",
};

export default function RLogin() {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
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

  return (
    <>
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
          paddingTop:'4rem',
          fontWeight:'bold',
          paddingBottom:'4rem'}}>
            Kaduna State Integrated Management Information System
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
              ></Box>
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
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Sign In
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
                            color="success"
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
                           autoComplete="new-password"
                           color="success"
                            
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <FormControlLabel
                              sx={{ width: "60%" }}
                              onClick={() => setRemember(!remember)}
                              control={<Checkbox checked={remember} />}
                              label="Remember me"
                            />
                            <Typography
                              variant="body1"
                              component="span"
                              onClick={() => {
                                navigate("/reset-password");
                              }}
                              style={{ marginTop: "10px", cursor: "pointer" }}
                            >
                              Forgot password?
                            </Typography>
                          </Stack>
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
                            Sign in
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Not registered yet?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                  navigate("/register");
                                }}
                              >
                                Create an Account
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
            <Typography
              style={{
                textAlign: "center",
                marginTop: "3rem",
                color: "green",
                fontSize: "0.9rem",
              }}
            >
              Supported By
            </Typography>

            <Typography
              style={{
                textAlign: "center",
                color: "green",
                fontSize: "0.9rem",
              }}
            >
              The Expanding Social Protection for Inclusive Development (ESPID)
              Project with funding from UKAid
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "1.2rem",
            }}
          >
            <Link>
              <img
                src="https://ik.imagekit.io/amazonaga12345/STC_Logo_Eng_Stacked_ColPos_RGB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674515619709/100"
                alt="welcom"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "13%",
                  margin: "1rem",
                }}
              />
            </Link>

            <Link>
              <img
                src="https://ik.imagekit.io/amazonaga12345/UKaid.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674515620100"
                alt="welcom"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "30%",
                  margin: "1rem",
                }}
              />
            </Link>

            <Link href="/">
              <img
                src="https://ik.imagekit.io/amazonaga12345/image001.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674515619225"
                alt="welcom"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "40%",
                  margin: "1rem",
                }}
              />
            </Link>

            <img
              src="https://ik.imagekit.io/amazonaga12345/ACF_LOGO.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674515619489"
              alt="welcom"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                margin: "1rem",
              }}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
