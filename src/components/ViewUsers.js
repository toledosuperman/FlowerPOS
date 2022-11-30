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
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


function ViewUsers() {
    //create state for react components
    const { user } = UserAuth();
  const [Users, setUsers] = useState([]);
const [  setSearch] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentUsers, setCurrentUsers] = useState({
      name: " ",
      email: " ",
      role: false,
      
  });
  const [currentUsersId, setCurrentUsersId] = useState([]);
 //function to retrieve users from database
  const fetchUsers = useCallback(() =>{
      setIsLoading(true);
      FirestoreService.getAllUsers().then((response) => {
          setIsLoading(false);
          setUsers(response._snapshot.docChanges);
          console.log(response._snapshot.docChanges)
          console.log(currentUsersId)
      }).catch((e) => {
          setIsLoading(false);
          toast.error("Error occurred while fetching the user. " + e);
      })
  }, [currentUsersId]);
  //use effect to utilize above function when event occurs
  useEffect(() => {
      if (user !== null) {  
          fetchUsers();
      }
  }, [user, fetchUsers])
//more use state react components
  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
  const [validated, setValidated] = useState(false);
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
  //function to handle closing modals
  const handleModalClose = () => {
      setShowAddEditForm(false);
      setShowDeleteDialogue(false);
      setCurrentUsersId(" ");
      setAddEditFormType("Add");
      setCurrentUsers({ name: " ", role: false, email: " "})
      setIsLoading(false);
  }
  //function to submit update firestore data
  const handleAddEditFormSubmit = async (e) => {
      e.preventDefault();
      const { name, role, email } = e.target.elements;
              setIsLoading(true);
              try {
          await FirestoreService.UpdateUsers(currentUsersId, name.value, email.value, role.value);
          toast.success(`${name.value} is successfully updated.`);
          handleModalClose();
          window.location.reload(false);
      } catch (e_1) {
          toast.error("Error occured: " + e_1.message);
          setIsLoading(false);
      }
          
      
      setValidated(true)
  }
//function to delete firestore data
  const handleUsersDelete = async (e) => {
    e.preventDefault();
      setIsLoading(true);
      try {
          await Promise.resolve(FirestoreService.DeleteUsers(currentUsersId));
          toast.success(`Deletion Successful`);
          handleModalClose();
          window.location.reload(false);
      } catch (e_1) {
          toast.error("Error occurred: " + e_1.message);
          setIsLoading(false);
      }
  }

  return (
      <> 
      {/* logged in view */}
          {(user === null) && <NoLoggedInView />}
          {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
          {(user !== null) && <>
          {/* background image */}
            <React.Fragment> <div style={{ backgroundImage: `url(${background})`,
  
  backgroundSize:"contain", 
   }}>
   <Navbar />
  
              {/* Add/Edit Form */}
              <Modal show={showAddEditForm} onHide={handleModalClose}>
                  <Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
                      <Modal.Header closeButton>
                          <Modal.Title>{addEditFormType }</Modal.Title>
                      </Modal.Header>
                      <Modal.Body> {/*change user name */}
                          <FloatingLabel controlId="Name" label="User Name" className="mb-3" >
                              <Form.Control required type='text' placeholder='Enter User Name' size='md' value={currentUsers?.name} onChange={(e) => {
                                  setCurrentUsers({
                                      "name": e.target.value,                   
                                      
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>User Name is required</Form.Control.Feedback>
                          </FloatingLabel>

                          
                                {/* change user roles*/}
                          
                          <ToggleButtonGroup type="radio" name="options" value={currentUsers?.role} onChange={(e) => {
                                  setCurrentUsers({
                                      "role": e.target.value,                   
                                      
                                  })
                              }}>
        <ToggleButton id="tbg-radio-1" value={false}>
          Sales
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={true}>
          Admin
        </ToggleButton>
        
      </ToggleButtonGroup>
                   
                         
                      </Modal.Body>
                      <Modal.Footer>
                          <Button type="submit">{(addEditFormType === 'Add') ? 'Add' : 'Update'}</Button>
                      </Modal.Footer>
                  </Form>
              </Modal>
          

              {/* Delete Confirmation Dialogue START */}
              <Modal show={showDeleteDialogue} onHide={handleModalClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Delete User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <p>Are you sure you want to delete {currentUsers.name}?</p>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                      <Button variant="danger" onClick={handleUsersDelete}>Yes, Delete</Button>
                  </Modal.Footer>
              </Modal>

          
{/* table view*/}
              <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-Users-center">
                      <div className="align-Users-center" style={{ marginRight: 8 }}>
                          
                          <h4 style={{ marginTop: 8, }}>View Users</h4>
                          
                      </div>
                      <Form>
          <InputGroup className='my-3'>
         
            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Users'
              style={{ width: 350, }}
            />
          </InputGroup>
        </Form>
                  </Card.Header>
                  <Card.Body>
                      <Table layout={{  fixedHeader: true }} responsive className="table table-striped">
                      <thead>
                        <tr><th>#</th>
                             <th>User Name</th>
                             <th>User Email</th>
                             <th>Admin</th>
                             
                             <th>Actions</th></tr>
                     </thead>
                          <tbody>
                            
                              { (Users.map((user, index) => (
                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      {console.log(user.doc.data.value.mapValue.fields.name.stringValue)}
                                      <td>{user.doc.data.value.mapValue.fields.name.stringValue}</td>
                                      <td>{user.doc.data.value.mapValue.fields.email.stringValue}</td>
                                      <td> {user.doc.data.value.mapValue.fields.role.booleanValue ? 'Admin' : 'Sales'}</td>
                                      
                                      <td>
                                      {' '}
                                          <Button variant='primary' onClick={() => {
                                              setCurrentUsersId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1])
                                              setCurrentUsers({
                                                  "name": user.doc.data.value.mapValue.fields.name.stringValue,
                                                  "email": user.doc.data.value.mapValue.fields.email.stringValue,
                                                  "role": user.doc.data.value.mapValue.fields.role.booleanValue
                                                  
                                              });
                                              setAddEditFormType("Edit");
                                              setShowAddEditForm(true);
                                          }}>✎ Edit</Button>{' '}
                                          <Button variant='danger' onClick={() => {
                                              setCurrentUsersId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1]);
                                              setCurrentUsers({
                                                  "name": user.doc.data.value.mapValue.fields.name.stringValue,
                                                  "email": user.doc.data.value.mapValue.fields.email.stringValue ,
                                                  "role": user.doc.data.value.mapValue.fields.role.booleanValue,
                                                  
                                                });
                                              setShowDeleteDialogue(true);
                                          }}>x Delete</Button>
                                      </td>
                                  </tr>
                              )))}
                          </tbody>
{/* toaster styling */}
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
                          <React.Fragment>
                          
      </React.Fragment>
                      </Table>
                  </Card.Body>
              </Card></div>
               <Footer />
              </React.Fragment></>}
      </>
  );
}

export default ViewUsers;