import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css'
import Axios from 'axios';
import { Avatar, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';



function validateName(name){
  if(name === null || name === '' || name.length<3 ){return true;}
}
function validate(name){
    if(name === null || name === ''){return true;}
}




export default function AddElections() {
    const [nameError, setNameError] = React.useState(false);
    const [aadharError, setAadharError] = React.useState(false);
    const [partyNameError, setPartyNameError] = React.useState(false);
    const [partyImageError, setPartyImageError] = React.useState(false);
    const [currentPositionError, setCurrentPositionError] = React.useState(false);
    const [rows,setRows] = React.useState([]);
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };

    React.useEffect(()=>{
        Axios.get("http://localhost:3001/api/getCandidates")
        .then((result) => {
            const d = result.data;
            d.forEach((item, i) => {
                item.id = i + 1;
            });
            setRows(d);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    // check for errors in each field
  const errorCheck = (data) =>{
    if(validateName(data.get('name'))){setNameError(true);}
    if(validate(data.get('startDate'))){setAadharError(true);}
    if(validate(data.get('endDate'))){setCurrentPositionError(true);}
    if(validate(data.get('positionName'))){setPartyNameError(true);}
    if(validate(data.get('description'))){setPartyImageError(true);}
    if(checked.length === 0){alert('Please pick at least one candidate!')}
  }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(rows);
        errorCheck(data);
        if(
            !validateName(data.get('name')) &&
            !validate(data.get('startDate')) &&
            !validate(data.get('endDate')) &&
            !validate(data.get('positionName')) &&
            !validate(data.get('description')) &&
            checked.length !== 0
            ){
                console.log("Entered Data correct!");
                Axios.post("http://localhost:3001/api/addElection",{
                    name: data.get('name'),
                    startDate: data.get('startDate'),
                    endDate: data.get('endDate'),
                    positionName: data.get('positionName'),
                    description: data.get('description'),
                    candidatesChosen: checked,
                })
                .then(() => {
                  console.log("success")
                  alert('Data Successfully Entered!')
                })
                .catch((err)=> {
                    console.log(err);
                    if(err.response.data === 1062){
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
            Add Election Details Here
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Election Name"
                  autoFocus
                  error={nameError}
                  onChange={() => setNameError(false)}
                  helperText={nameError ? "Please enter Election name" : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="startDate"
                  label="Start Date"
                  name="startDate"
                  defaultValue="2023-01-01"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type='date'
                  error={aadharError}
                  onChange={() => setAadharError(false)}
                  helperText={aadharError ? "Please enter valid Start Date" : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="endDate"
                  label="End Date"
                  name="endDate"
                  defaultValue="2023-11-01"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type='date'
                  error={currentPositionError}
                  onChange={() => setCurrentPositionError(false)}
                  helperText={currentPositionError ? "Please enter a valid End Date" : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="positionName"
                  label="Position Name"
                  name="positionName"
                  error={partyNameError}
                  onChange={() => setPartyNameError(false)}
                  helperText={partyNameError ? "Please enter a valid Position name" : ''}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  multiline
                  error={partyImageError}
                  onChange={() => setPartyImageError(false)}
                  helperText={partyImageError ? "Please enter a valid Description" : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <List dense sx={{width: '100%', bgcolor: 'Background.paper'}}>
                    {rows.map((row) => {
                        const labelId = `checkbox-list-secondary-label-${row.candidate_id}`;
                        return(
                        <ListItem
                        sx={{border: 1, borderRadius: 5}}
                        key={row.name}
                        secondaryAction={
                            <Checkbox
                            edge='end'
                            onChange={handleToggle(row.candidate_id)}
                            checked={checked.indexOf(row.candidate_id) !== -1}
                            />
                        }
                        disablePadding
                        >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                    alt={"Error"}
                                    src={row.partyImage}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`${row.name}\u2003\u2003\u2003Belongs to party${row.partyName}`} />
                            </ListItemButton>
                        </ListItem>
                    );
                    })}
                </List>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add New Election Details
            </Button>
          </Box>
    )
}
