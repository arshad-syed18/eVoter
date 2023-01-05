import Axios from 'axios';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';



const  columns = [
    { field: 'name', headerName: 'User Name', flex: 2 },
    { field: 'voter_id', headerName: 'Voter ID', flex: 2 },
    { field: 'DOB', headerName: 'Date Of Birth', flex: 2 },
    { field: 'age', headerName: 'Age', flex: 1},
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'nationality', headerName: 'Nationality', flex: 1.5 },
    { field: 'userType', headerName: 'User Type', flex: 2 },
  ];

export default function UserDetails() {
    const [userData,setUserData] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    React.useEffect(()=>{
        Axios.get("http://localhost:3001/api/getUsers")
        .then((result) => {
            const d = result.data;
            d.forEach((item, i) => {
                item.id = i + 1;
                item.DOB = item.DOB.split('T')[0].split("-").reverse().join("-");
                item.userType = item.userType ? 'Admin' : 'User'
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
      function resetPassword() {
        console.log("Do reset password later "+selectedRows); // TODO work here ----------------------
      }
      function deteleUser() {
        console.log("Do Delete User later "+selectedRows); // TODO work here ----------------------
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
                onClick={() => resetPassword()}
                sx={{ mt: 3, mb: 2, mr: 4 }}>
                    Reset Password
                </Button>
                <Button
                variant="contained"
                onClick={() => deteleUser()}
                sx={{ mt: 3, mb: 2 }}>
                    Delete User
                </Button>
            </Box>
        </div>
    )
}