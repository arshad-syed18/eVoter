import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  
function createData(name, startDate, endDate, positionName, description) {
    return { name, startDate, endDate, positionName, description };
}
  
const rows = [
    createData('First Elections','2022-11-01', '2022-12-01', 'MLA', 'This election is for MLA position in ABX District, Bangalore'),
    createData('First Elections','2022-11-01', '2022-12-01', 'MLA', 'This election is for MLA position in ABX District, Bangalore'),
    createData('First Elections','2022-11-01', '2022-12-01', 'MLA', 'This election is for MLA position in ABX District, Bangalore'),
];

const borderdata = {borderBottom: 1,borderRight:1, borderColor: 'gray'}


export const electionList = (
    <React.Fragment>
      {/* Here lies the table */}
      <div className='electionTable'>
        <TableContainer component={Paper}>
            <Table stickyHeader sx={{minWidth: 700}} aria-label="Elections">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='justify' sx={borderdata}>Election Name</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Start Date</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>End Date</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Position</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Description</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Vote</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row)=> (
                        <StyledTableRow key={row.name} >
                            <StyledTableCell component="th" scope="row" sx={borderdata}>
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>{row.startDate}</StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>{row.endDate}</StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>{row.positionName}</StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>{row.description}</StyledTableCell>
                            <StyledTableCell align='justify' sx={borderdata}>Click here to vote!Add link to vote page</StyledTableCell>
                        </StyledTableRow>
                        
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
      
    </React.Fragment>
  );
  
  export default function ActiveElections(){
    return electionList
  }