import React, { useEffect, useState , useCallback} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Button, Modal, Form, FloatingLabel, Spinner, InputGroup} from 'react-bootstrap';
import Navbar from './navbar';
import Footer from './footer';
import { UserAuth } from '../context/AuthContext';
import FirestoreService from './FirestoreService.js';
import NoLoggedInView from './NoLoggedInView.js';
import toast, { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import { FaRegTrashAlt } from 'react-icons/fa';
function ViewUsers() {
    const { user } = UserAuth();
  const [Users, setUsers] = useState([]);
// const [  setSearch] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
      
      email: " ",
      posusername: " ",
      role: " "

  });
  const [currentUserId, setCurrentUserId] = useState(['']);


 
 
  //fetching all Users
  const fetchUsers = useCallback(() =>{
      setIsLoading(true);
     
      FirestoreService.getAllUsers().then((response) => {
          setIsLoading(false);
          setUsers(response._snapshot.docChanges);
          console.log(response._snapshot.docChanges)
          console.log(currentUserId)
         
      }).catch((e) => {
          setIsLoading(false);
          toast.error("Error occurred while fetching the menu User. " + e);
      })
  }, [currentUserId]);

  useEffect(() => {
      if (user !== null) {
          
          fetchUsers();
      }
  }, [user, fetchUsers])

  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
  const [validated, setValidated] = useState(false);
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false); //delete
  const [showDetailsForm, setShowDetailsForm] = useState(false); //view details

  const handleModalClose = () => {
      setShowAddEditForm(false);
      setShowDeleteDialogue(false);
      setShowDetailsForm(false);
      setCurrentUserId("");
      setAddEditFormType("Add");
      setCurrentUser({ posusername: " ", email: " ", role: " "})
      setIsLoading(false);
  }

  // handling for add/edit functionality
  const handleAddEditFormSubmit = (e) => {
      e.preventDefault();
      const { posusername, email,  role } = e.target.elements;

      if (email.value && posusername.value) {
          if (addEditFormType === "Add") {
              setIsLoading(true);
              return FirestoreService.AddNewUsers(posusername.value, email.value,  role.value).then(() => {
                  toast.success(`${posusername.value} is successfully added.`)
                  handleModalClose();
                  window.location.reload(false);
              }).catch((e) => {
                //toast message
                  toast.error("Error occured: " + e.message);
                  setIsLoading(false);
              })
          } else if (addEditFormType === "Edit") {
              setIsLoading(true);
              return FirestoreService.UpdateUsers(currentUserId, posusername.value, email.value,  role.value).then(() => {
                  toast.success(`${posusername.value} is successfully updated.`);
                  handleModalClose();
                  window.location.reload(false);
              }).catch((e) => {
                  toast.error("Error occured: " + e.message);
                  setIsLoading(false);
              })
          }
      }
      setValidated(true)
  }

  //handling delete functionality
  const handleUserDelete = async (e) => {
    e.preventDefault();
      setIsLoading(true);
      try {
          await Promise.resolve(FirestoreService.DeleteUsers(currentUserId));
          toast.success(`Deletion Successful`);
          handleModalClose();
        //   window.location.reload(false);
      } catch (e_1) {
          toast.error("Error occurred: " + e_1.message);
          setIsLoading(false);
      }
  }



  return (
      <>
          {(user === null) && <NoLoggedInView />}
          {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
          {(user !== null) && <>
            <React.Fragment> <div style={{ backgroundImage: `url(${background})`,
  
  backgroundSize:"contain", 
   }}>
   <Navbar />
  
              {/* Add/Edit Form */}
              <Modal show={showAddEditForm} onHide={handleModalClose}>
                  <Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
                      <Modal.Header closeButton>
                          <Modal.Title>{(addEditFormType === 'Add') ? 'Add User' : 'Edit'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <FloatingLabel controlId="posusername" label="User posusername" classposusername="mb-3" >
                              <Form.Control required role='text' placeholder='Enter User posusername' size='md' value={currentUser?.posusername} onChange={(e) => {
                                  setCurrentUser({
                                      "posusername": e.target.value,
                                      
                                      
                                      
                                  })
                              }} />
                              <Form.Control.Feedback role='invalid'>User posusername is required</Form.Control.Feedback>
                          </FloatingLabel>

                          

                          {/* <FloatingLabel controlId="email" label="email ($)" classposusername="mb-3">
                              <Form.Control required role='text' placeholder='Enter User email' size='md' value={currentUser?.email} onChange={(e) => {
                                  setCurrentUser({
                                      
                                      "email": e.target.value,
                                      
                                      
                                  })
                              }} />
                              <Form.Control.Feedback role='invalid'>User email is required</Form.Control.Feedback>
                          </FloatingLabel> */}

                          

                          <FloatingLabel controlId="role" label="role" classposusername="mb-3">
                              <Form.Control required role='text' placeholder='Enter User role' size='md' value={currentUser?.role} onChange={(e) => {
                                  setCurrentUser({
                                      
                                      
                                      
                                      "role": e.target.value
                                  })
                              }} />
                              <Form.Control.Feedback role='invalid'>User role is required</Form.Control.Feedback>
                          </FloatingLabel>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button role="submit">{(addEditFormType === 'Add') ? 'Add' : 'Update'}</Button>
                      </Modal.Footer>
                  </Form>
              </Modal>
          

              {/* Delete Confirmation Dialogue START */}
              <Modal show={showDeleteDialogue} onHide={handleModalClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Delete User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <p>Are you sure you want to delete {currentUser.posusername}?</p>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                      <Button variant="danger" onClick={handleUserDelete}>Yes, Delete</Button>
                  </Modal.Footer>
              </Modal>

             {/* User details */}
             <Modal show={showDetailsForm} onHide={handleModalClose}>
                   <Modal.Header closeButton>
                   <Modal.Title>User Details</Modal.Title>
                   </Modal.Header> 
                   <Modal.Body>

                        <p>
                        User posusername: {currentUser?.posusername}            <br />
                        User email: {currentUser?.email}           <br />
                       
                        User role: {currentUser?.role}          <br />
                        </p>
                    </Modal.Body> 
                  <Modal.Footer> 
                      <Button variant="danger" onClick={handleModalClose}>Stop Viewing</Button>
                  </Modal.Footer> 
              </Modal>

              <Card style={{ margin: 24 }}>
                  <Card.Header classposusername="d-flex justify-content-between align-Users-center">
                      <div classposusername="align-Users-center" style={{ marginRight: 8 }}>
                          
                          <h4 style={{ marginTop: 8, }}>View Users</h4>
                          
                      </div>
                      <Form>
          <InputGroup classposusername='my-3'>
          {/* <Button style={{ backgroundColor: '#0d6efd', borderWidth: 0, marginRight: 25, }} onClick={() => {
                          setShowAddEditForm(true);
                      }}>Add New User</Button> */}
            {/* onChange for search */}
            {/* <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Users'
              style={{ width: 350, }}
            /> */}
          </InputGroup>
        </Form>
                  </Card.Header>
                  <Card.Body>
                      <Table responsive classposusername="table table-striped">
                      <thead>
                        <tr><th>#</th>
                             <th>User posusername</th>
                             <th>User email</th>
                            
                             <th>User role</th>
                             <th>Actions</th></tr>
                     </thead>
                          <tbody>
                            {/* <tr><td><input role='text' onChange={(e)=>changeSearch(e.target.value)}></input></td></tr> */}
                            { (Users.map((user, index) => (
                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      {console.log(user.doc.data.value.mapValue.fields.posusername.stringValue)}
                                      <td>{user.doc.data.value.mapValue.fields.posusername.stringValue}</td>
                                      <td>{user.doc.data.value.mapValue.fields.email.stringValue }</td>
                                     
                                      <td>{user.doc.data.value.mapValue.fields.role.stringValue}</td> 
                                      <td>
                                      {/* <Button variant= 'success' onClick={()=>{
                                      setCurrentUserId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1])
                                      setCurrentUser({
                                        "posusername": user.doc.data.value.mapValue.fields.posusername.stringValue,
                                        "email": user.doc.data.value.mapValue.fields.email.stringValue ,
                                        
                                        "role": user.doc.data.value.mapValue.fields.role.stringValue
                                      });
                                      setShowDetailsForm(true);
                                      }}>Details</Button>{' '} */}
                                          <Button variant='primary' onClick={() => {
                                              setCurrentUserId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1])
                                              setCurrentUser({
                                                  "posusername": user.doc.data.value.mapValue.fields.posusername.stringValue,
                                                  "email": user.doc.data.value.mapValue.fields.email.stringValue ,
                                                  
                                                  "role": user.doc.data.value.mapValue.fields.role.stringValue
                                              });
                                              setAddEditFormType("Edit");
                                              setShowAddEditForm(true);
                                          }}>✎ Edit</Button>{' '}
                                          <Button variant='danger' onClick={() => {
                                              setCurrentUserId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1]);
                                              setCurrentUser({
                                                  "posusername": user.doc.data.value.mapValue.fields.posusername.stringValue,
                                                  "email": user.doc.data.value.mapValue.fields.email.stringValue ,
                                                  
                                                  "role": user.doc.data.value.mapValue.fields.role.stringValue
                                                });
                                              setShowDeleteDialogue(true);
                                          }}>{<FaRegTrashAlt />}</Button>
                                      </td>
                                  </tr>
                              )))}
                          </tbody>
                          </Table>
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
                        
                     
                  </Card.Body>
              </Card></div>
               <Footer />
              </React.Fragment></>}
      </>
  );
}

export default ViewUsers;
                   