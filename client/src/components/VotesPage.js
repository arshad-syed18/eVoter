import { Box, createTheme, CssBaseline, Grid, ThemeProvider, Typography } from '@mui/material';
import Axios from 'axios';
import * as React from 'react';

export default function VotesPage(props){
    const elect = props.props;  // election id of the election clicked
    const e = {election_id : elect};
    const [electionData, setElectionData] = React.useState([]);
    const [candidateData, setCandidateData] = React.useState({});
    React.useEffect(()=>{
        //getting election details
        Axios.post("http://localhost:3001/api/getElection", e)
        .then((res) => {
            res.data[0].startDate = res.data[0].startDate.split('T')[0].split("-").reverse().join("-");
            res.data[0].endDate = res.data[0].endDate.split('T')[0].split("-").reverse().join("-");
            setElectionData(res.data[0])
        })
        .catch((err)=>{
            if(err.response) {
                let errorMessage = err.response.data;
                console.log(errorMessage);
              }
        });
        // getting candidates list
        Axios.post("http://localhost:3001/api/getElectionCandidates", e)
        .then((res) => {
            setCandidateData(res.data);
        })
        .catch((err)=>{
            if(err.response) {
                let errorMessage = err.response.data;
                console.log(errorMessage);
              }
        });
        // eslint-disable-next-line
    }, []);

    const columns = [
        {field: 'name', headerName: 'Candidate Name'},
        {field: 'partyName', headerName: 'Party Name'},
        {field: 'currentPosition', headerName: 'Current Position'},
        {field: 'introDetails', headerName: 'Introduction'},
        {field: 'City', headerName: 'City'},
    ]

    console.log(electionData)
    console.log(candidateData[1]) // remove this 
    const theme = createTheme()

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main">
                <CssBaseline/>
                <Box
                    sx={{
                        my: 4,
                        mx: 4,
                        display: 'block',
                        flexDirection: 'column-reverse',
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
              gutterBottom
            >
              Voting for {electionData.name} Elections!
            </Typography>
            <Typography
            variant="body2"
            color="inherit"
            noWrap
            fontSize={17}
            paddingBottom={0.5}
            sx={{ flexGrow: 1 }}
            align="justify"
            gutterBottom>
            Here are the details for the elections!
            </Typography>
            <Typography
            color="inherit"
            noWrap
            fontSize={17}
            paddingBottom={0.5}
            sx={{ flexGrow: 1 }}
            align="justify">
                <strong>Election Name :</strong> {electionData.name}
            </Typography>
            <Typography
            color="inherit"
            noWrap
            fontSize={17}
            paddingBottom={0.5}
            sx={{ flexGrow: 1 }}
            align="justify">
                <strong>Description :</strong> {electionData.Description}
            </Typography>
            <Typography
            color="inherit"
            noWrap
            fontSize={17}
            paddingBottom={0.5}
            sx={{ flexGrow: 1 }}
            align="justify">
                <strong>Position For :</strong> {electionData.positionName} <br/>
            </Typography>
            <Typography
            color="inherit"
            noWrap
            fontSize={17}
            paddingBottom={1.5}
            sx={{ flexGrow: 1 }}
            align="justify">
                <strong>Start of Elections :</strong> {electionData.startDate}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <strong>End of Elections :</strong> {electionData.endDate}
            </Typography>
            <Typography
            color="inherit"
            noWrap
            fontSize={20}
            paddingBottom={0.5}
            sx={{ flexGrow: 1 }}
            align="justify">
                Below are the list of candidates standing for the elections
            </Typography>
            {/* <DataGrid>

            </DataGrid> */}
            </Box>
            </Grid>
        </ThemeProvider>
        

    );
}