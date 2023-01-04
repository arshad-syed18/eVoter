import Axios from 'axios';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';



const  columns = [
    { field: 'name', headerName: 'User Name', flex: 2 },
    { field: 'voter_id', headerName: 'Voter ID', flex: 2 },
    { field: 'DOB', headerName: 'Date Of Birth', flex: 2 },
    { field: 'age', headerName: 'Age'},
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'nationality', headerName: 'Nationality', flex: 1.5 },
    { field: 'password', headerName: 'Password', flex: 2 },
  ];

export default function UserDetails() {
    const [userData,setUserData] = React.useState([]);

    React.useEffect(()=>{
        Axios.get("http://localhost:3001/api/getUsers")
        .then((result) => {
            const d = result.data;
            d.forEach((item, i) => {item.id = i + 1;item.DOB = item.DOB.split('T')[0].split("-").reverse().join("-")});
            setUserData(d);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    console.log(userData)
    return(
        <div style={{ height: 550, width: '100%' }}>
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
                        rows={userData} 
                        columns={columns} />
                    </div>
    )
}