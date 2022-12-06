import React, { useEffect, useState 
    // , useCallback
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Button, Modal, Form, FloatingLabel, Spinner, InputGroup} from 'react-bootstrap';
import Navbar from './navbar';
import Footer from './footer';
import './footer.css';
import { UserAuth } from '../context/AuthContext';
import FirestoreService from './FirestoreService.js';
import NoLoggedInView from './NoLoggedInView.js';
import toast, { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import { FaRegTrashAlt } from 'react-icons/fa';
import Toggle from 'react-toggle'
import {  db} from "../firebase.js";
import { collection, getDocs, query} from "firebase/firestore";
import "react-toggle/style.css"
import { DataGrid } from '@mui/x-data-grid'
const columns = [
    { field: "name", headerName: "Name", width: 160 },
    { field: "email", headerName: "Email", width: 210 },
    { field: "role", headerName: "Role", width: 160 }
    
  ];
  export default function ViewUsers () {
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
  <div style={{ height: 400, width: "100%" }}>
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
    />
  </div>
);
}
//     const { user } = UserAuth();
//   const [Users, setUsers] = useState([]);
// // const [  setSearch] = useState([])
//   const [isLoading, setIsLoading] = useState(false);

//   const [currentUser, setCurrentUser] = useState({
      
//       role: false

// });
//   const [currentUserId, setCurrentUserId] = useState(['']);


 
 
//   //fetching all Users
//   const fetchUsers = useCallback(() =>{
//       setIsLoading(true);
     
//       FirestoreService.getAllUsers().then((response) => {
//           setIsLoading(false);
//           setUsers(response._snapshot.docChanges);
//           console.log(response._snapshot.docChanges)
//           console.log(currentUserId)
         
//       }).catch((e) => {
//           setIsLoading(false);
//           toast.error("Error occurred while fetching the menu User. " + e);
//       })
//   }, [currentUserId]);

//   useEffect(() => {
//       if (user !== null) {
          
//           fetchUsers();
//       }
//   }, [user, fetchUsers])

//   const [showAddEditForm, setShowAddEditForm] = useState(false);
//   const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
//   const [validated, setValidated] = useState(false);
//   const [showDeleteDialogue, setShowDeleteDialogue] = useState(false); //delete
//   // const [showDetailsForm, setShowDetailsForm] = useState(false); //view details

//   const handleModalClose = () => {
//       setShowAddEditForm(false);
//       setShowDeleteDialogue(false);
//       // setShowDetailsForm(false);
//       setCurrentUserId("");
//       setAddEditFormType("Add");
//       setCurrentUser({  role: false})
//       setIsLoading(false);
//   }

//   // handling for add/edit functionality
//   const handleAddEditFormSubmit = (e) => {
//       e.preventDefault();
//       const { posusername, role } = e.target.elements;

//       if (role.value && posusername.value) {
//           if (addEditFormType === "Add") {
//               setIsLoading(true);
//               return FirestoreService.AddNewUsers(posusername.value, role.value).then(() => {
//                   toast.success(`${posusername.value} is successfully added.`)
//                   handleModalClose();
//                   window.location.reload(false);
//               }).catch((e) => {
//                 //toast message
//                   toast.error("Error occured: " + e.message);
//                   setIsLoading(false);
//               })
//           } else if (addEditFormType === "Edit") {
//               setIsLoading(true);
//               return FirestoreService.UpdateUsers(currentUserId, posusername.value, role.value).then(() => {
//                   toast.success(`${posusername.value} is successfully updated.`);
//                   handleModalClose();
//                   window.location.reload(false);
//               }).catch((e) => {
//                   toast.error("Error occured: " + e.message);
//                   setIsLoading(false);
//               })
//           }
//       }
//       setValidated(true)
//   }

//   //handling delete functionality
//   const handleUserDelete = async (e) => {
//     e.preventDefault();
//       setIsLoading(true);
//       try {
//           await Promise.resolve(FirestoreService.DeleteUsers(currentUserId));
//           toast.success(`Deletion Successful`);
//           handleModalClose();
//         //   window.location.reload(false);
//       } catch (e_1) {
//           toast.error("Error occurred: " + e_1.message);
//           setIsLoading(false);
//       }
//   }



//   return ( <React.Fragment>
//       <>
//           {(user === null) && <NoLoggedInView />}
//           {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
//           {(user !== null) && <>
//             <React.Fragment> <div className="background" style={{ backgroundImage: `url(${background})`,backgroundSize:"contain", }} >
//    <Navbar />
  
//               {/* Add/Edit Form */}
//               <Modal show={showAddEditForm} onHide={handleModalClose}>
//                   <Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
//                       <Modal.Header closeButton>
//                           <Modal.Title>{(addEditFormType === 'Add') ? 'Add User' : 'Edit'}</Modal.Title>
//                       </Modal.Header>
//                       <Modal.Body>
//                           <FloatingLabel controlId="posusername" label="User Name" className="mb-3" >
//                               <Form.Control required type='text' placeholder='Enter User Name' size='md' value={currentUser?.posusername} onChange={(e) => {
//                                   setCurrentUser({
//                                       "posusername": e.target.value,
                                      
                                      
                                      
//                                   })
//                               }} />
//                               <Form.Control.Feedback role='invalid'>User name is required</Form.Control.Feedback>
//                           </FloatingLabel>

                        

                          

//                           <FloatingLabel controlId="role" label="Role" className="mb-3">
                         
//                               {/* <Form.Control required type='text' placeholder='Enter User role' size='md' value={currentUser?.role} onChange={(e) => {
//                                   setCurrentUser({
                                      
                                      
                                      
//                                       "role": e.target.value
//                                   })
//                               }} /> */}
                          
//                           </FloatingLabel>
//                       </Modal.Body>
//                       <Modal.Footer>
//                           <Button role="submit">{(addEditFormType === 'Add') ? 'Add' : 'Update'}</Button>
//                       </Modal.Footer>
//                   </Form>
//               </Modal>
          

//               {/* Delete Confirmation Dialogue START */}
//               <Modal show={showDeleteDialogue} onHide={handleModalClose}>
//                   <Modal.Header closeButton>
//                       <Modal.Title>Delete User</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                       <p>Are you sure you want to delete {currentUser.posusername}?</p>
//                   </Modal.Body>
//                   <Modal.Footer>
//                       <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
//                       <Button variant="danger" onClick={handleUserDelete}>Yes, Delete</Button>
//                   </Modal.Footer>
//               </Modal>


//               <Card style={{ margin: 24 }}>
//                   <Card.Header className="d-flex justify-content-between align-Users-center">
//                       <div className="align-Users-center" style={{ marginRight: 8 }}>
                          
//                           <h4 style={{ marginTop: 8, }}>View Users</h4>
                          
//                       </div>
//                       <Form>
//           <InputGroup className='my-3'>
       
//           </InputGroup>
//         </Form>
//                   </Card.Header>
//                   <Card.Body>
//                       <Table responsive className="table table-striped">
//                       <thead>
//                         <tr><th>#</th>
//                              <th>User Name</th>
//                              <th>User Email</th>
                            
//                              <th>User Role</th>
//                              <th>Actions</th></tr>
//                      </thead>
//                           <tbody>
                        
//                             { (Users.map((user, index) => (
//                                   <tr key={index}>
//                                       <td>{index + 1}</td>
//                                       {console.log(user.doc.data.value.mapValue.fields.posusername.stringValue)}
//                                       <td>{user.doc.data.value.mapValue.fields.posusername.stringValue}</td>
//                                       <td>{user.doc.data.value.mapValue.fields.email.stringValue }</td>
                                     
//                                       <td>{user.doc.data.value.mapValue.fields.role.booleanValue ? 'Admin' : 'Sales'} <Toggle
//                             id='role'
//                             defaultChecked={user.doc.data.value.mapValue.fields.role.booleanValue}
//                             onChange={(e) =>setCurrentUser({
                                      
                                      
                                      
//                                 "role": !(user.doc.data.value.mapValue.fields.role.booleanValue)
//                             })} /></td> 
//                                       <td>
                                
//                                           {/* <Button variant='primary' onClick={() => {
//                                               setCurrentUserId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1])
//                                               setCurrentUser({
//                                                   "posusername": user.doc.data.value.mapValue.fields.posusername.stringValue,
                                                  
                                                  
//                                                   "role": user.doc.data.value.mapValue.fields.role.stringValue
//                                               });
//                                               setAddEditFormType("Edit");
//                                               setShowAddEditForm(true);
//                                           }}>✎ Edit</Button>{' '} */}
//                                           <Button variant='danger' onClick={() => {
//                                               setCurrentUserId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1]);
//                                               setCurrentUser({
//                                                   "posusername": user.doc.data.value.mapValue.fields.posusername.stringValue,
                                                  
                                                  
//                                                   "role": user.doc.data.value.mapValue.fields.role.stringValue
//                                                 });
//                                               setShowDeleteDialogue(true);
//                                           }}>{<FaRegTrashAlt />}</Button>
//                                       </td>
//                                   </tr>
//                               )))}
//                           </tbody>
//                           </Table>
//                             {/* toast message */}
//                           <Toaster toastOptions={{
//     success: {
//       style: {
//         background: 'green',
//       },
//     },
//     error: {
//       style: {
//         background: 'red',
//       },
//     },
//   }}/>
                        
                     
//                   </Card.Body>
//               </Card></div>


//               </React.Fragment></>}
//       </> <Footer /> </React.Fragment>
//   );
// }
    
// export default ViewUsers;
                   