import Axios from 'axios';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Checkbox, Typography } from '@mui/material';


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


export default function UserDetails() {
    const [rows,setRows] = React.useState([]);
    const [selectedIds, setSelectedIds] = React.useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };


    React.useEffect(()=>{
        Axios.get("http://localhost:3001/api/getCandidates")
        .then((result) => {
            const d = result.data;
            d.forEach((item, i) => {
                item.id = i + 1;
            });
            console.log(d);
            setRows(d);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
      function removeCandidate() {
        console.log("Do remove candidate later "); // TODO work here ----------------------
        console.log(selectedIds)
      }
      function updateCandidate() {
        console.log("Do update candidate later "); // TODO work here ----------------------
        console.log(selectedIds)
      }

    return(
        <div style={{ height: 500, width: '100%' }}>
            <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            marginBottom={3}
            align="justify">
                Here Are the details of all users currently registered
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 490 }}>
                <Table stickyHeader sx={{minWidth: 700}} aria-label="Elections">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='justify' sx={borderdata}>Check</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Aadhar Number</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Candidate Name</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Representing Party</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Party Symbol</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Current Position</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>City</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>Details</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row)=> (
                    <StyledTableRow key={row.name} >
                        <StyledTableCell align='justify'sx={borderdata}>
                        <Checkbox
                        checked={selectedIds.includes(row.candidate_id)}
                        onChange={() => handleCheckboxChange(row.candidate_id)}
                        />
                        </StyledTableCell>
                        <StyledTableCell align='justify'sx={borderdata}>{row.candidate_id}</StyledTableCell>
                        <StyledTableCell component="th" scope="row" sx={borderdata}>
                        {row.name}
                        </StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>{row.partyName}</StyledTableCell>
                        <StyledTableCell align='center' sx={borderdata}>
                                        <img alt="Icon Load Error" src={row.partyImage} width="80" height="80"/>
                                    </StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>{row.currentPosition}</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>{row.City}</StyledTableCell>
                        <StyledTableCell align='justify' sx={borderdata}>{row.introDetails}</StyledTableCell>
                    </StyledTableRow>
                                
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Box
            m={1}
            display="flex"
            alignItems="flex-start">
                <Button
                variant="contained"
                onClick={() => removeCandidate()}
                sx={{ mt: 3, mb: 2, mr: 4 }}>
                    Remove Candidate
                </Button>
                <Button
                variant="contained"
                onClick={() => updateCandidate()}
                sx={{ mt: 3, mb: 2 }}>
                    Update Candidate
                </Button>
            </Box>
        </div>
    )
}