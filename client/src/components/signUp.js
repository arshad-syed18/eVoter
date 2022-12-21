import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";


const theme = createTheme();


export default function SignUp() {
  let history = useNavigate()
  // Navigate to Signup
  function goTologin(){
    history("/")
  }


  const [nameError, setNameError] = React.useState(false);
  const [voterIDError, setvoterIDError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)
  const [DOBError, setDOBError] = React.useState(false)
  const [nationality, setNationality] = React.useState('');

  const handleChange = (event) => {
    setNationality(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setNameError(false)
    setvoterIDError(false)
    setEmailError(false)
    setPasswordError(false)
    setDOBError(false)
    if(data.get('Name') === ''){
      setNameError(true);

    }
    //TODO add error checking here and then push to node js

    console.log({
      name: data.get('Name'),
      voterID: data.get('voterID'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
      
        <Box
          sx={{
            marginTop: 8,
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
                  helperText={voterIDError ? "Please enter your voterID" : ''}
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
                  helperText={passwordError ? "Please enter a password between 6-16 characters" : ''}
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
                    onChange={handleChange}
                  >
                    <MenuItem value="Indian">Indian</MenuItem>
                    <MenuItem value="Foreign">Foreign</MenuItem>
                  </Select>
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
  );
}