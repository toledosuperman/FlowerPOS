import React, { useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Spinner, Card} from 'react-bootstrap';
import Navbar from './navbar';
import Footer from './footer';
import './footer.css';
import { UserAuth } from '../context/AuthContext';
import NoLoggedInView from './NoLoggedInView.js';
import  { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import {  db} from "../firebase.js";
import { collection, getDocs} from "firebase/firestore";
import "react-toggle/style.css"
import { DataGrid } from '@mui/x-data-grid'
const columns = [
    { field: "name", headerName: "Name", width: 160 },
    { field: "email", headerName: "Email", width: 210 },
    { field: "role", headerName: "Role", width: 160 }
    
  ];
  export default function ViewUsers () {
    const [isLoading] = useState(false);
    const { user } = UserAuth();
    const [row, setRow] = useState([]);
  
    useEffect(() => {
      const getAdmins = async () => {
        const admins = await getDocs(collection(db, "users"));
        admins.forEach((admin) => {
          console.log(admin.data());
          setRow((r) => ([
            ...r,
            {
                id: admin.data().email,
                name: admin.data().posusername,
                email: admin.data().email,
                role: admin.data().role  ? 'Admin' : 'Sales'
               
            },
        ]));
    });
};
getAdmins();
}, []);

console.log("row", row);

return (
    <React.Fragment>
      <>
          {(user === null) && <NoLoggedInView />}
          {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
          {(user !== null) && <>
            <React.Fragment> <div className="background" style={{ backgroundImage: `url(${background})`,backgroundSize:"contain", }} >
  <Navbar />
  <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-Products-center">
                      <div className="align-Products-center" style={{ marginRight: 8 }}>
                          
                          <h4 style={{ marginTop: 8, }}>Users</h4>
                          </div></Card.Header><Card.Body>
  <div style={{ height: 400, width: "100%" }}>
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      sx={{
        boxShadow: 2,
        border: 2,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },}}
      checkboxSelection
    /></div>
  </Card.Body></Card>
  {/* toast message */}
  <Toaster toastOptions={{
    success: {
      style: {
        background: 'green',
      },
    },
    error: {
      style: {
        background: 'red',
      },
    },
  }}/>
;
</div>


</React.Fragment></>}
</> <Footer /> </React.Fragment>)
}
 




                      
                        
                     
   
    

                   