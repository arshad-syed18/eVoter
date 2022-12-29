import * as React from 'react';
import { Box, createTheme, CssBaseline, Grid, ThemeProvider, Typography } from '@mui/material';


const theme = createTheme();

export default function UserProfile({userData}){
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