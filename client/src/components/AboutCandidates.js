import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/material';
import Axios from 'axios';


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

const borderdata = {borderBottom: 1,borderRight:1, borderColor: 'gray'}

export default function AboutCandidates(){
    const [rows,setRows] =React.useState([])
    React.useEffect(() => {
        Axios.get("http://localhost:3001/api/getCandidates")
          .then((res) => {
            console.log(res.data);
            setRows(res.data);
          })
          .catch((err) => {
            if(err.response) {
              let errorMessage = err.response.data;
              console.log(errorMessage);
            }
          });
    }, []);
    if(rows.length === 0){
      return(
      <Alert variant='filled' severity='error'>There are no Candidates Currently! </Alert>
      );
    }
    return(
        
        <div className='electionTable'>
      <div className='two'>
                        <h1>Candidates for currently active elections</h1>
                    </div>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{minWidth: 700}} aria-label="Elections">
          <TableHead>
            <TableRow>
              <StyledTableCell align='justify' sx={borderdata}>Candidate Name</StyledTableCell>
              <StyledTableCell align='justify' sx={borderdata}>Party Name</StyledTableCell>
              <StyledTableCell align='justify' sx={borderdata}>Current Position</StyledTableCell>
              <StyledTableCell align='justify' sx={borderdata}>City</StyledTableCell>
              <StyledTableCell align='justify' sx={borderdata}>Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row)=> (
              <StyledTableRow key={row.name} >
                <StyledTableCell component="th" scope="row" sx={borderdata}>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align='justify' sx={borderdata}>{row.partyName}</StyledTableCell>
                <StyledTableCell align='justify' sx={borderdata}>{row.currentPosition}</StyledTableCell>
                <StyledTableCell align='justify' sx={borderdata}>{row.City}</StyledTableCell>
                <StyledTableCell align='justify' sx={borderdata}>{row.introDetails}</StyledTableCell>
              </StyledTableRow>
                        
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}