import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import BgImage from '../assets/loginImage.jpg';
import '@fontsource/roboto/400.css'
import Axios from 'axios';

let flag=false;

function validateEmail(email){
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) { return false;} 
  else {flag=true; return true;}
 }
 function validatePassword(passwd){
  let p = passwd;
  if(p.length>5){return false;}
  else return true;
}

const theme = createTheme();

export default function Login() {
  let navigate = useNavigate()
  // Navigate to Signup
  function goTosignUp(){
    navigate("/signUp")
  }
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(validateEmail(data.get('email'))){setEmailError(true);}
    if(validatePassword(data.get('password'))){setPasswordError(true);}
    if(!validateEmail(data.get('email')) && !validatePassword(data.get('password'))){
      console.log("Congrats! All fields correctly entered!");
      flag=true;
    }
    if(flag===true){
      let userData = {
        email: data.get('email'),
        password: data.get('password')
      }
      const e = {email: userData.email};
      console.log(userData);
      Axios.post("http://localhost:3001/api/getUser", userData)
      .then((res) => {
        console.log("Congrats, Password correctly entered!");
        // Get user details then send to home page
        Axios.post("http://localhost:3001/api/getUserDetails", e)
        .then((res) => {
          console.log("Congrats, details are here!");
          if(res.data[0].userType === 1){
            console.log("Welcome Admin!");
            navigate("/adminDashboard", {state : res.data[0]})
          }
          else{
            console.log("Welcome User!");
            navigate("/home",{state : res.data[0]})
          }
        })
        .catch((err) => {
        if(err.response) {
          let errorMessage = err.response.data;
          console.log(errorMessage);
        }
        });
       
      })
      .catch((err) => {
        if(err.response) {
          let errorMessage = err.response.data;
          console.log(errorMessage);
          if(errorMessage === "user does not exist"){
            alert('User is not registered!');
          }
          setPasswordError(true);
        }
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BgImage})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome to eVoter!
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> 
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* This will create a form and handle on submit requests*/}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError}
                onChange={() => setEmailError(false)}
                helperText={emailError ? "Please enter a valid email" : ''}
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
                error={passwordError}
                onChange={() => setPasswordError(false)}
                helperText={passwordError ? "Please enter the correct password!" : ''}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={() =>alert('Your password has been sent to the email!')}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={goTosignUp}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}