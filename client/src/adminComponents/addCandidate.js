import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css'
import Axios from 'axios';



function validateName(name){
  if(name === null || name === '' || name.length<3 ){console.log(name);return true;}
}
function validateAadhar(aadharNumber){
    return !(/^\d{12}$/.test(aadharNumber));
}
function validate(name){
    if(name === null || name === ''){console.log(name);return true;}
}




export default function UserDetails() {
    const [nameError, setNameError] = React.useState(false);
    const [aadharError, setAadharError] = React.useState(false);
    const [partyNameError, setPartyNameError] = React.useState(false);
    const [partyImageError, setPartyImageError] = React.useState(false);
    const [cityError, setCityError] = React.useState(false);
    const [introError, setIntroError] = React.useState(false);
    const [currentPositionError, setCurrentPositionError] = React.useState(false);


    // check for errors in each field
  const errorCheck = (data) =>{
    if(validateName(data.get('name'))){setNameError(true);}
    if(validateAadhar(data.get('AadharNumber'))){setAadharError(true);}
    if(validate(data.get('currentPosition'))){setCurrentPositionError(true);}
    if(validate(data.get('PartyName'))){setPartyNameError(true);}
    if(validate(data.get('partyImage'))){setPartyImageError(true);}
    if(validate(data.get('City'))){setCityError(true);}
    if(validate(data.get('intro'))){setIntroError(true);}
  }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        errorCheck(data);
        if(
            !validateName(data.get('name')) &&
            !validateAadhar(data.get('AadharNumber')) &&
            !validate(data.get('currentPosition')) &&
            !validate(data.get('PartyName')) &&
            !validate(data.get('partyImage')) &&
            !validate(data.get('City')) &&
            !validate(data.get('intro'))
            ){
                console.log("Entered Data correct!");
                Axios.post("http://localhost:3001/api/addCandidate",{
                    candidate_id : data.get('AadharNumber'),
                    name: data.get('name'),
                    currentPosition: data.get('currentPosition'),
                    partyName: data.get('PartyName'),
                    partyImage: data.get('partyImage'),
                    City: data.get('City'),
                    introDetails: data.get('intro'),
                })
                .then(() => {
                  console.log("success")
                  alert('Data Successfully Entered!')
                })
                .catch((err)=> {
                    if(err.response.data.errorCode === 1062){
                        alert('duplicate entry!');
                    }
                    else
                        console.log(err.response.data);
                })
            }
            else{
                console.log("Error in entered data try again");
            }
      }

    return(
          <Box component="form" noValidate onSubmit={handleSubmit} >
            <Typography component="h1" variant="h5" marginBottom={3}>
            Add Candidate Details Here
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Candidate Name"
                  autoFocus
                  error={nameError}
                  onChange={() => setNameError(false)}
                  helperText={nameError ? "Please enter candidate name" : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="AadharNumber"
                  label="Aadhar Number"
                  name="AadharNumber"
                  error={aadharError}
                  onChange={() => setAadharError(false)}
                  helperText={aadharError ? "Please enter valid candidate Aadhar Number" : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="currentPosition"
                  label="Current Position"
                  name="currentPosition"
                  error={currentPositionError}
                  onChange={() => setCurrentPositionError(false)}
                  helperText={currentPositionError ? "Please enter a valid current position" : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="PartyName"
                  label="Party Name"
                  name="PartyName"
                  error={partyNameError}
                  onChange={() => setPartyNameError(false)}
                  helperText={partyNameError ? "Please enter a valid party name" : ''}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="partyImage"
                  label="Party Image"
                  id="partyImage"
                  error={partyImageError}
                  onChange={() => setPartyImageError(false)}
                  helperText={partyImageError ? "Please enter a valid image link that points to an image resource file, Preferablly from wikiMedia." : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="City"
                label="City"
                id="City"
                error={cityError}
                onChange={() => setCityError(false)}
                helperText={cityError ? "Please enter a valid city" : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="intro"
                label="Introduction on Candidate"
                id="intro"
                multiline
                error={introError}
                onChange={() => setIntroError(false)}
                helperText={introError ? "Please enter Introduction details about candidate!" : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Candidate Details
            </Button>
          </Box>
    )
}
