import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import '@fontsource/roboto/400.css'
import BgImage from '../assets/signUpBg.jpg'; 
import Axios from 'axios';


const theme = createTheme();
const styles = {
  heroContainer: {
    backgroundImage: `url(${BgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: `calc(100vw + 48px)`,
    margin: -24,
    padding: 24,
  }
};
let flag = false; // Flag used to check if everything is validated

function validateEmail(email){
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) { return false;} 
  else {flag=true; return true;}
 }
function validateName(name){
  if(name === '' || name.length<3){return true;}
}
function validateVoterID(voterid){
  let regex = new RegExp(/^[A-Z]{3}[0-9]{7}$/);
  if (regex.test(voterid)) { return false;}
  else return true;
}
function validatePhone(phone){
  let regex = new RegExp(/^[7-9][0-9]{9}$/)
  if(regex.test(phone)) {return false;}
  else  return true;
}
function validatePassword(passwd){
  let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  if(regex.test(passwd)){return false;}
  else return true;
}
function validateDOB(Dob){
  let regex = new RegExp(/(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).([19,20]{2})+([0-9]{2})/);
  if(regex.test(Dob)){return false;}
  else return true;
}

export default function SignUp() {
  let history = useNavigate()
  // Navigate to Signup
  function goTologin(){
    history("/")
  }


  const [nameError, setNameError] = React.useState(false);
  const [voterIDError, setvoterIDError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [DOBError, setDOBError] = React.useState(false);
  const [nationalityError, setNationalityError] = React.useState(false);
  const [nationality, setNationality] = React.useState('');
  const [PhoneNumberError, setPhoneNumberError] = React.useState(false)


  const errorCheck = (data) =>{
    if(validateName(data.get('Name'))){setNameError(true);}
    if(validateVoterID(data.get('voterID'))){setvoterIDError(true);}
    if(validatePhone(data.get('PhoneNumber'))){setPhoneNumberError(true);}
    if(validateEmail(data.get('email'))){setEmailError(true);}
    if(validatePassword(data.get('password'))){setPasswordError(true);}
    if(validateDOB(data.get('DateOfBirth'))){setDOBError(true);}
    if(nationality === ''){setNationalityError(true);}
    if(
      !validateName(data.get('Name')) &&
      !validateVoterID(data.get('voterID')) &&
      !validatePhone(data.get('PhoneNumber')) && 
      !validateEmail(data.get('email')) &&
      !validatePassword(data.get('password')) &&
      !validateDOB(data.get('DateOfBirth'))
    ){
      console.log("Congrats! Everything is validated!")
      flag=true;
    }
    else { 
      console.log("Not Validated! Please check below to see what went wrong!");
      flag=false;
      console.log({
      name: validateName(data.get('Name')),
      voterID: validateVoterID(data.get('voterID')),
      phone: validatePhone(data.get('PhoneNumber')),
      email: validateEmail(data.get('email')),
      password: validatePassword(data.get('password')),
      DOB: validateDOB(data.get('DateOfBirth')),
    });
  }
  }

  const handleChange = (event) => {
    setNationality(event.target.value);
    setNationalityError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    errorCheck(data);
    //TODO add error checking here and then push to node js
    
    // Axios.post()

    console.log({
      name: data.get('Name'),
      voterID: data.get('voterID'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };


  return (
    <Grid
    container
    direction="column"
    justify="flex-end"
    alignItems="right"
    style={styles.heroContainer} >
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
      
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  error={nameError}
                  onChange={() => setNameError(false)}
                  helperText={nameError ? "Please enter your name" : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="voterID"
                  label="Voter ID"
                  name="voterID"
                  error={voterIDError}
                  onChange={() => setvoterIDError(false)}
                  helperText={voterIDError ? "Please enter your voterID" : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="PhoneNumber"
                  label="Phone Number"
                  name="PhoneNumber"
                  error={PhoneNumberError}
                  onChange={() => setPhoneNumberError(false)}
                  helperText={PhoneNumberError ? "Please enter your Phone Number" : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                  onChange={() => setEmailError(false)}
                  helperText={emailError ? "Please enter your email" : ''}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError}
                  onChange={() => setPasswordError(false)}
                  helperText={passwordError ? "Please enter a password between 6-16 characters with at least one uppercase letter, one lowercase letter and one number." : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                required
                fullWidth
                name="DateOfBirth"
                label="Date Of Birth"
                id="DateOfBirth"
                error={DOBError}
                onChange={() => setDOBError(false)}
                helperText={DOBError ? "Please enter your dob in DD/MM/YYYY format" : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nationality}
                    label="Nationality"
                    error={nationalityError}
                    onChange={handleChange}
                  >
                    <MenuItem value="Indian">Indian</MenuItem>
                    <MenuItem value="Foreign">Foreign</MenuItem>
                  </Select>
                  <FormHelperText
                    error={nationalityError}
                  >{nationalityError ? "Please select your nationality" : ''}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={goTologin}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Grid>
  );
}