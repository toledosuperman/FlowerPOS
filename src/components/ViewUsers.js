import React, { useEffect, useState , useCallback} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Button, Modal, Form, Spinner, InputGroup} from 'react-bootstrap';
import Navbar from './navbar';
import Footer from './footer';
import { UserAuth } from '../context/AuthContext';
import FirestoreService from './FirestoreService.js';
import NoLoggedInView from './NoLoggedInView.js';
import toast, { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import { FaRegTrashAlt } from 'react-icons/fa';
import { db} from '../firebase'
import { query, onSnapshot, collection} from 'firebase/firestore';
// import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
// import ToggleButton from 'react-bootstrap/ToggleButton';

                          
                          /* <ToggleButtonGroup type="radio" name="options" value={currentUsers?.role} onChange={(e) => {
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
        
      </ToggleButtonGroup> */

function ViewUsers() {
  
    //create state for react components
    const { user } = UserAuth();
  const [Users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentUsers, setCurrentUsers] = useState({
      posusername: " ",
      email: "",
      uid: "",
      role: false,
      authProvider: ""
    //   role: <boolean>true</boolean>,
      
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
  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = [];
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setCurrentUsers(usersArr);
    });
    return () => unsubscribe();
  }, []);
//more use state react components
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
  const [showRoleDialogue, setShowRoleDialogue] = useState(false);
  //function to handle closing modals
  const handleModalClose = () => {
    setShowRoleDialogue(false);
      setShowDeleteDialogue(false);
      setCurrentUsersId("");
     
      setCurrentUsers({role: false})
      setIsLoading(false);
  }
  const toggleRole = async (e) => {
    e.preventDefault();
    const { role} = e.target.elements;
      setIsLoading(true);
      try {
          await Promise.resolve(FirestoreService.UpdateUsers(currentUsersId, role.value));
          toast.success(`Update Successful`);
          handleModalClose();
          window.location.reload(false);
      } catch (e_1) {
          toast.error("Error occurred: " + e_1.message);
          setIsLoading(false);
      }
    // await updateDoc(doc(db, 'users', user.id), {
    //   role: !user.role,
    // });
  };

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
  
 
          

              {/* Delete Confirmation Dialogue START */}
              <Modal show={showDeleteDialogue} onHide={handleModalClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Delete User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <p>Are you sure you want to delete {currentUsers.posusername}?</p>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                      <Button variant="danger" onClick={handleUsersDelete}>Yes, Delete</Button>
                  </Modal.Footer>
              </Modal>

          {  /*toggle user */}
          <Modal show={showRoleDialogue} onHide={handleModalClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Change User Permission</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <p>Are you sure you want to change {currentUsers.posusername}?</p>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                      <Button variant="danger" onClick={toggleRole} value={currentUsers?.role}>Yes</Button>
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
                                      {console.log(user.doc.data.value.mapValue.fields.posusername.stringValue)}
                                      <td>{user.doc.data.value.mapValue.fields.posusername.stringValue}</td>
                                      <td>{user.doc.data.value.mapValue.fields.email.stringValue}</td>
                                      <td> {user.doc.data.value.mapValue.fields.role.booleanValue ? 'Admin' : 'Sales'}</td>
                                      
                                      <td>
                                      {' '}
                                          <Button variant='primary' onClick={() => {
                                              setCurrentUsersId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1])
                                              
                                              setCurrentUsers({
                                                  
                                                  "role": user.doc.data.value.mapValue.fields.role.booleanValue
                                                  
                                              })
                                              setShowRoleDialogue(true);
                                              ;
                                              
                                          }}>Change Permissions</Button>{' '}
                                          <Button variant='danger' onClick={() => {
                                              setCurrentUsersId(user.doc.key.path.segments[user.doc.key.path.segments.length - 1]);
                                              setCurrentUsers({
                                                  
                                                  "role": user.doc.data.value.mapValue.fields.role.booleanValue,
                                                  
                                                });
                                              setShowDeleteDialogue(true);
                                          }}>{<FaRegTrashAlt />}</Button>
                                      </td>
                                  </tr>
                              )))}
                          </tbody>
                          </Table>
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
                         
                  </Card.Body>
              </Card></div>
               <Footer />
              </React.Fragment></>}
      </>
  );
}

export default ViewUsers;

                   