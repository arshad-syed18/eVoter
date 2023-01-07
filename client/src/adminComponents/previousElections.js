import Axios from 'axios';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';



const  columns = [
    { field: 'election_id', headerName: 'Election ID'},
    { field: 'name', headerName: 'Election Name', flex: 2 },
    { field: 'startDate', headerName: 'Start Date', flex: 2 },
    { field: 'endDate', headerName: 'End Date', flex: 2 },
    { field: 'positionName', headerName: 'For Position', flex: 2},
    { field: 'Description', headerName: 'Description', flex: 4 },
    { field: 'victor', headerName: 'Victor', flex: 2 },
  ];

export default function UserDetails() {
    const [userData,setUserData] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    React.useEffect(()=>{
        Axios.get("http://localhost:3001/api/getPreviousElections")
        .then((result) => {
            const d = result.data;
            d.forEach((item, i) => {
                item.id = i + 1;
                item.startDate = item.startDate.split('T')[0].split("-").reverse().join("-")
                item.endDate = item.endDate.split('T')[0].split("-").reverse().join("-")
            });
            setUserData(d);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => userData.find((row) => row.id === id));
        setSelectedRows(selectedRowsData);
      };
    function removeElection() {
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
                Here Are the details of all the previous elections!
            </Typography>
                        <DataGrid 
                        checkboxSelection
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
                sx={{ mt: 3, mb: 2 }}>
                    Remove Election
                </Button>
            </Box>
        </div>
    )
}