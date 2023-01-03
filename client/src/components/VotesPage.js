import { Box, CssBaseline, Grid, TableContainer, Typography, Paper, styled, Radio, Button  } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Axios from 'axios';
import * as React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  })); 
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
}));
const borderdata = {borderBottom: 2,borderRight:2, borderColor: 'gray'}

export default function VotesPage(props){
    const elect = props.props.electionClicked;  // election id of the election clicked
    const userData = props.props.userData;
    const e = {election_id : elect};
    const [electionData, setElectionData] = React.useState([]);
    const [candidateData, setCandidateData] = React.useState([]);
    const [votedCandidate, setVotedCandidate] = React.useState({});
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

    console.log(electionData)
    console.log(candidateData) 
    console.log(userData);// remove this 
    const handle = (event) =>{
        event.preventDefault();
        console.log(votedCandidate)
        if(votedCandidate === null){
            console.log("Voter not selected!");
            alert('Vote for a candidate please!');
        }
        if(votedCandidate != null){
            console.log("Voting for %s",votedCandidate.name)
            alert('You have selected the candidate '+ votedCandidate.name)
            let data = {
                userData : userData,
                electionData: electionData,
                candidateData: votedCandidate
            }
            console.log(data);
            Axios.post("http://localhost:3001/api/addVote",data)
            .then(()=> {
                console.log("Successfully Voted!");
                props.props.changePage()
            })
            .catch((err)=>{
                if(err.response) {
                    let errorMessage = err.response.data;
                    console.log(errorMessage);
                    if(errorMessage.errorCode === 1062){
                      console.log("Duplicate entry! Voted Already!");
                      alert('Voted Already!');
                    }
                    else{
                      console.log(errorMessage);
                    }
                  }
            });
        }
        
    }

    return (
            <Grid container component="main">
                <CssBaseline/>
                <Box
                component="form" 
                onSubmit={handle}
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
            
            
            <TableContainer component={Paper} sx={{maxHeight: 440}}>
            <Table stickyHeader sx={{minWidth: 700}} aria-label="VoteElections">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='justify' sx={borderdata}>Candidate Name</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Representing Party</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Party Symbol</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Current Position</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Introduction</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>City</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Vote</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {candidateData.map((row)=> (
                        <StyledTableRow key={row.name} >
                            <StyledTableCell component="th" scope="row" sx={borderdata}>{row.name}</StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>{row.partyName}</StyledTableCell>
                            <StyledTableCell align='center' sx={borderdata}>
                                <img alt="Icon Load Error" src={row.partyImage} width="80" height="80"/>
                            </StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>{row.currentPosition}</StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>{row.introDetails}</StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>{row.City}</StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>
                                <Radio
                                checked={votedCandidate === row}
                                onClick={() =>setVotedCandidate(row)}
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
                Submit
            </Button>
            </Box>
            </Grid>  

    );
}