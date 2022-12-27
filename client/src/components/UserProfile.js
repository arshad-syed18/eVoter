import * as React from 'react';
import Axios from 'axios';
import { Box, createTheme, CssBaseline, Divider, Grid, TextField, ThemeProvider, Typography } from '@mui/material';


const theme = createTheme();

export default function UserProfile(){
    const e = {email: "arshad18syed@gmail.com"};
    const [userData,setUserData] =React.useState({})
    React.useEffect(() => {

    Axios.post("http://localhost:3001/api/getUserDetails", e)
      .then((res) => {
        console.log("Congrats, details are here!");
        setUserData(res.data[0]);
        console.log(userData)
      })
      .catch((err) => {
        if(err.response) {
          let errorMessage = err.response.data;
          console.log(errorMessage);
        }
      });
      // eslint-disable-next-line
    }, []);
      console.log(userData)
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main">
                <CssBaseline/>
                <Box
                    sx={{
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                }}
          >
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              align="justify"
            >
              Here are your current details!
            </Typography>
            <br/>
            <Typography
              color="inherit"
              noWrap
              fontSize={17}
              paddingBottom={0.5}
              sx={{ flexGrow: 1 }}
              align="justify">
                Name: {userData.name}
            </Typography>
            <Typography
              color="inherit"
              noWrap
              fontSize={17}
              paddingBottom={0.5}
              sx={{ flexGrow: 1 }}
              align="justify">
                Age: {userData.age}
            </Typography>
            <Typography
              color="inherit"
              noWrap
              fontSize={17}
              paddingBottom={0.5}
              sx={{ flexGrow: 1 }}
              align="justify">
                email: {userData.email}
            </Typography>
            <Typography
              color="inherit"
              noWrap
              fontSize={17}
              paddingBottom={0.5}
              sx={{ flexGrow: 1 }}
              align="justify">
                VoterID : {userData.voter_id}
            </Typography>
            <Typography
              color="inherit"
              noWrap
              fontSize={17}
              paddingBottom={0.5}
              sx={{ flexGrow: 1 }}
              align="justify">
                Phone Number: {userData.phoneNumber}
            </Typography>
            <Typography
              color="inherit"
              noWrap
              fontSize={17}
              paddingBottom={0.5}
              sx={{ flexGrow: 1 }}
              align="justify">
                Date Of birth: {userData.DOB.split('T')[0]}
            </Typography>
            <Typography
              color="inherit"
              noWrap
              fontSize={17}
              paddingBottom={0.5}
              sx={{ flexGrow: 1 }}
              align="justify">
                Nationality: {userData.nationality}
            </Typography>
          </Box>
            </Grid>
        </ThemeProvider>
    );
}