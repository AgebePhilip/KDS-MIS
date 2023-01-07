import * as React from 'react';
import Box from '@mui/material/Box';
import {Twitter, FacebookRounded, Instagram} from '@mui/icons-material/';
import { Divider, Grid, Link} from '@mui/material';


const SocialLink = ({link, Icon}) => {
 return (
    <Link href={link} underline="hover" sx={{ 
      border: '1px solid white',
      margin: '5px',
      borderRadius: '5px',
      padding: '3px',
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}
      target="_blank"
      rel="noopener"     
      >
      <Icon  color="success"/>
  </Link>
 )
}
const HomeFooter = () => {

  return (
      <>
        <Box component={'footer'} sx={{flexGrow: 1, minHeight:"80px",  backgroundColor:"black", mt:4}}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
               hello
            </Grid>
            <Grid item xs={4}>
                hi
            </Grid>
          </Grid>
        </Box>
        <Divider style={{background: '#e3e3e3' }}/>
        <Box component={'footer'} sx={{display:"flex", flexDirection:'row-reverse',  backgroundColor:"black"}}>
          <SocialLink link="http" Icon={FacebookRounded}  />
          <SocialLink link="#" Icon={Twitter} />
          <SocialLink link="#" Icon={Instagram} />
        </Box>

      </>
  );
};
export default HomeFooter;
