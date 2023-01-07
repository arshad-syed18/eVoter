import Axios from 'axios';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Collapse from '@mui/material/Collapse';


export default function UpcomingElections () {
    const [userData,setUserData] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    // eslint-disable-next-line
    const [candidateData, setCandidateData] = React.useState([]);
    const [selectedIds, setSelectedIds] = React.useState([]);
    React.useEffect(()=>{
        Axios.get("http://localhost:3001/api/getUpcomingElections")
        .then((result) => {
            const d = result.data;
            d.forEach((item, i) => {
                item.id = i + 1;
                item.startDate = item.startDate.split('T')[0].split("-").reverse().join("-")
                item.endDate = item.endDate.split('T')[0].split("-").reverse().join("-")
                Axios.post("http://localhost:3001/api/getInactiveElectionCandidates", {election_id: item.election_id})
                .then((res) => {
                    setCandidateData(res.data);
                    item.candidatesData = res.data.map(obj => ({id: obj.candidate_id,name: obj.name}));
                })
                .catch((err)=>{
                    if(err.response) {
                        let errorMessage = err.response.data;
                        console.log(errorMessage);
                    }
                });
            });
            setUserData(d);
        }).catch((err) => {
            console.log(err);
        });
        
    }, []);
    
    const RenderList = (props) => {
        let a = props.row;
        let b = typeof a.candidatesData !== 'undefined' ? a.candidatesData : [];
        const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleCheckboxChange = ( id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
        
    }
        return(
            <List dense>
                <ListItem onClick={handleClick}>
                    <ListItemText primary="Candidates" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        { 
                        b.map(item => (
                            <ListItem key={item.id} dense>
                                <Checkbox size='small'  checked={selectedIds.includes(item.id)} onChange={() => handleCheckboxChange( item.id)}/>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
            
        );
    }
    const  columns = [
        { field: 'election_id', headerName: 'Election ID', flex: 1.3},
        { field: 'name', headerName: 'Election Name', flex: 2 },
        { field: 'startDate', headerName: 'Start Date', flex: 1.5 },
        { field: 'endDate', headerName: 'End Date', flex: 1.5 },
        { field: 'positionName', headerName: 'For Position', flex: 2},
        { field: 'Description', headerName: 'Description', flex: 4 },
        {   field: 'candidatesData', 
            headerName: 'Candidates', flex: 3,
            renderCell: RenderList
        }
    ];


    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => userData.find((row) => row.id === id));
        setSelectedRows(selectedRowsData);
      };
      function removeElection(){
        console.log("do remove election");
        const electionIds = selectedRows.map(election => election.election_id);
        if(electionIds.length === 0){
            alert('select the election please!');
            return;
        }
        let a = {election_id: electionIds};
        if(window.confirm("Delete elections?")){
          Axios.post("http://localhost:3001/api/deletePreviousElection", a)
          .then((result) => {
            if(result.data === true)
              alert('Election deleted successfully')
            setSelectedRows([]);
          })
          .catch((err) => {
              console.log(err);
          });
      }
      }
      function removeCandidate() {
        const electionIds = selectedRows.map(election => election.election_id);
        if(electionIds.length === 0){
            alert('select the election please!');
            return;
        }
        if(selectedIds.length === 0){
            alert('select the candidates please!');
            return;
        }
        let a = {election_id: electionIds, candidate_id: selectedIds};
        if(window.confirm("Delete candidates?")){
          Axios.post("http://localhost:3001/api/deleteCandidatesFromElection", a)
          .then((result) => {
            if(result.data === true)
              alert('Election deleted successfully')
            setSelectedRows([]);
          })
          .catch((err) => {
              console.log(err);
          });
      }
        
      }

    return(
        <div style={{ height: 450, width: '100%' }}>
        <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
        align="justify">
            Here Are the details of all the upcoming elections!
        </Typography>
        <Typography
        align="justify"
        fontSize={14}
        marginBottom={3}>
            To remove candidates, please select the election and then select the candidates fom the List.
        </Typography>
        <DataGrid 
        checkboxSelection
        disableSelectionOnClick
        rows={userData} 
        columns={columns}
        getRowHeight={() => 'auto'} 
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}/>
        <Box
        m={1}
        display="flex"
        alignItems="flex-start">
            <Button
            variant="contained"
            onClick={() => removeElection()}
            sx={{ mt: 3, mb: 2, mr: 3 }}>
                Remove Election
            </Button>
            <Button
            variant="contained"
            onClick={() => removeCandidate()}
            sx={{ mt: 3, mb: 2 }}>
                Remove Candidates
            </Button>
        </Box>
    </div>
    )
}