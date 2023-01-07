import  React, {useState,useEffect, useCallback} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useUser from '../hooks/useAuth';
import useLoader from '../hooks/useLoader';
import useNotification from '../hooks/useNotification';
import { Avatar, Grid} from '@mui/material';
import FieldInput from '../components/Input/fileupload';
import useRequest from '../hooks/useRequest';
import { useConfirm } from 'material-ui-confirm';

const theme = createTheme();

const initial = {
  "firstName": "",
  "lastName": "",
  "phone": ""
}

export default function AddBook() {

  const user = useUser(state => state.user);
  const setUserData = useUser(state => state.setUserData);
  const confirm = useConfirm();
 
  const [photo, setPhoto] = useState(undefined);
  const [userDetail, setUserDetail] = useState(user);

  const [Loader, showLoader, HideLoader]  = useLoader()
  const [warningNotification, successNotification] = useNotification();




  const  [doRequest] = useRequest({
    url:undefined,
    method:"put",
    onSuccess:(data) => {
      setUserData(data)
      successNotification("successfully updated profile image", "Image updated")
    }
  })
  const  [updateProfileRequest] = useRequest({
    url:undefined,
    method:"put",
    onSuccess:(data) => {
      setUserData(data)
      successNotification("successfully updated profile", "Profile updated")
    }
  })
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoader()
   try {

    updateProfileRequest(userDetail, undefined, undefined, `/users/${user.id}/detail`)
    //setUserDetail(initial) 

   } catch (error) {
    console.log(error);
   }
   HideLoader()
  };


  const handleFileUploadError = (error) => {
    // Do something...
    console.log(error);
  }
  
  const handleFilesChange = async (files) => {
    // Do something...
    console.log(files);
    if(files[0]?.type.startsWith('image')){
      console.log(files, "here");
      setPhoto(files)

      confirm({
        description:'Are you sure you want to upload',
        confirmationText:"Yes",
      })
      .then( async() => {
        //showLoader()
        const data = new FormData();
        data.append("profile", files[0]);
    
        console.log(files[0], "now");

       try {

        console.log(files[0]);
    
        await doRequest({}, {'Content-Type':  `multipart/form-data; ${data.getBoundary}`},data, `/users/${user.id}/profile`)
        setPhoto(undefined) 
    
       } catch (error) {
        console.log(error);
        console.log("error from data", error);
       }
      })
      .catch((error) => {
        console.log(error, "catch");
      })

     HideLoader()
    }
  }

  const handleProfile = (e) =>{
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value
    })
  }


  return (
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
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={6} style={{ justifyContent: "center", display: "flex", padding: "0px", flexDirection:'column' }}>
              <Avatar
                alt={user?.firstName}
                src={user?.profile}
                sx={{ width: 180, height: 180, display: "flex", alignSelf:'center', marginBottom:"10px"}}
              />
              <FieldInput
                handleFileUploadError={handleFileUploadError}
                handleFilesChange={handleFilesChange}
                allowedExtensions={["image/*"]}
                title="Change Profile Image"
                value={photo}
                />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                fullWidth
                name="firstName"
                label="firstName"
                type="firstName"
                value={userDetail.firstName}
                onChange={handleProfile}
                id="firstName"
                autoComplete="firstName"
                color='success'
                size='small'
              />
              <TextField
                margin="normal"
                fullWidth
                name="lastName"
                label="lastName"
                type="lastName"
                value={userDetail.lastName}
                onChange={handleProfile}
                id="lastName"
                autoComplete="lastName"
                color='success'
                size='small'
              />
              <TextField
                margin="normal"
                fullWidth
                name="phone"
                label="phone"
                type="phone"
                value={userDetail.phone}
                onChange={handleProfile}
                id="phone"
                autoComplete="phone"
                color='success'
                size='small'
              />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                Update 
              </Button>
            </Grid>
          </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
