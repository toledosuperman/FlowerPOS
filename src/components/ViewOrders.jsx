import React, { useEffect, useState , useCallback} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Button, Modal, Form, FloatingLabel, Spinner, InputGroup} from 'react-bootstrap';
import Navbar from './navbar';
import { UserAuth } from '../context/AuthContext';
import FirestoreService from './FirestoreService.js';
import NoLoggedInView from './NoLoggedInView.js';
function ViewOrders() {
    const { user } = UserAuth();
  const [orders, setorders] = useState([]);
const [ setSearch] = useState([])


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
  

  const [isLoading, setIsLoading] = useState(false);

  const [currentorder, setCurrentorder] = useState({
  "CustomerAddress": '',
          "CustomerCity": '',
          "CustomerEmail": '',
          "CustomerName": '',
          "CustomerPhone": '',
          "CustomerState": '',
          "CustomerZip": '',
          "DeliveryDate": '',
          "Product": '',
          "RecipientAddress": '',
          "RecipientCity": '',
         "RecipientName": '',
         "RecipientPhone": '',
          "RecipientState": '',
          "RecipientZip": '',
          "completed": '',
          "created": ''
  });
  const [currentorderId, setCurrentorderId] = useState([]);



 

  const fetchorders = useCallback(() =>{
      setIsLoading(true);
     
      FirestoreService.getAllOrders().then((response) => {
          setIsLoading(false);
          setorders(response._snapshot.docChanges);
          console.log(response._snapshot.docChanges)
          console.log(currentorderId)
         
      }).catch((e) => {
          setIsLoading(false);
          alert("Error occured while fetching the menu order. " + e);
      })
  }, [currentorderId]);

  useEffect(() => {
      if (user !== null) {
          
          fetchorders();
      }
  }, [user, fetchorders])

  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
  const [validated, setValidated] = useState(false);

  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
 const [showDetailsForm, setShowDetailsForm] = useState(false);
  const handleModalClose = () => {
      setShowAddEditForm(false);
      setShowDeleteDialogue(false);
      setShowDetailsForm(false);
      setCurrentorderId("");
      setAddEditFormType("Add");
      setCurrentorder({ "CustomerAddress": '',
                                  "CustomerCity": '',
                                  "CustomerEmail": '',
                                  "CustomerName": '',
                                  "CustomerPhone": '',
                                  "CustomerState": '',
                                  "CustomerZip": '',
                                  "Delivery Date": '',
                                  "Product": '',
                                  "RecipientAddress": '',
                                  "RecipientCity": '',
                                 "RecipientName": '',
                                 "RecipientPhone": '',
                                  "RecipientState": '',
                                  "RecipientZip": '',
                                  "completed": '',
                                  "created": ''})
      setIsLoading(false);
  }

  const handleAddEditFormSubmit = (e) => {
      e.preventDefault();
      const { CustomerAddress,CustomerCity,CustomerEmail,CustomerName,
                            CustomerPhone,CustomerState, CustomerZip,DeliveryDate,Product,
                              RecipientAddress, RecipientCity,RecipientName,RecipientPhone,RecipientState,
                               RecipientZip,completed, created } = e.target.elements;

      if (DeliveryDate.value && CustomerName.value) {
          if (addEditFormType === "Add") {
              setIsLoading(true);
              FirestoreService.AddNewOrder(CustomerAddress.value,CustomerCity.value,CustomerEmail.value,CustomerName.value,
              CustomerPhone.value,CustomerState.value, CustomerZip.value,DeliveryDate.value,Product.value,
                RecipientAddress.value, RecipientCity.value,RecipientName.value,RecipientPhone.value,RecipientState.value,
                 RecipientZip.value,completed.value, created.value).then(() => {
                  alert(`${CustomerName.value} is successfully added to the menu.`)
                  handleModalClose();
                  window.location.reload(false);
              }).catch((e) => {
                  alert("Error occured: " + e.message);
                  setIsLoading(false);
              })
          } else if (addEditFormType === "Edit") {
              setIsLoading(true);
              FirestoreService.UpdateOrder(CustomerAddress.value,CustomerCity.value,CustomerEmail.value,CustomerName.value,
                                                         CustomerPhone.value,CustomerState.value, CustomerZip.value,DeliveryDate.value,Product.value,
                                                           RecipientAddress.value, RecipientCity.value,RecipientName.value,RecipientPhone.value,RecipientState.value,
                                                            RecipientZip.value,completed.value, created.value).then(() => {
                  alert(`${CustomerName.value} is successfully updated.`);
                  handleModalClose();
                  window.location.reload(false);
              }).catch((e) => {
                  alert("Error occurred: " + e.message);
                  setIsLoading(false);
              })
          }
      }
      setValidated(true)
  }

  const handleorderDelete = () => {
      setIsLoading(true);
      FirestoreService.DeleteOrder(currentorderId).then(() => {
          alert(`Deletion Successful`);
          handleModalClose();
          window.location.reload(false);
      }).catch((e) => {
          alert("Error occurred: " + e.message);
          setIsLoading(false);
      })
  }



  return (
      <>
          {(user === null) && <NoLoggedInView />}
          {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
          {(user !== null) && <>
            <React.Fragment>
   <Navbar />
              {/* Add/Edit Form */}
              <ErrorBoundary>
              <Modal show={showAddEditForm} onHide={handleModalClose}>
                  <Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
                      <Modal.Header closeButton>
                          <Modal.Title>{(addEditFormType === 'Add') ? 'Add order' : 'Edit'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <FloatingLabel controlId="Name" label="Customer Name" className="mb-3" >
                              <Form.Control required type='text' placeholder='Enter order Name' size='md' value={currentorder?.CustomerName} onChange={(e) => {
                                  setCurrentorder({
                                      "CustomerAddress": currentorder?.CustomerAddress,
                                      "CustomerCity": currentorder?.CustomerCity,
                                      "CustomerEmail": currentorder?.CustomerEmail,
                                      "CustomerName": e.target.value,
                                      "CustomerPhone": currentorder?.CustomerPhone,
                                      "CustomerState": currentorder?.CustomerState,
                                      "CustomerZip": currentorder?.CustomerZip,
                                      "Delivery Date": currentorder?.DeliveryDate,
                                      "Product": currentorder?.Product,
                                      "RecipientAddress": currentorder?.RecipientAddress,
                                      "RecipientCity": currentorder?.RecipientCity,
                                      "RecipientName": currentorder?.RecipientName,
                                      "RecipientPhone": currentorder?.RecipientPhone,
                                      "RecipientState": currentorder?.RecipientState,
                                      "RecipientZip": currentorder?.RecipientZip,
                                      "completed": currentorder?.completed,
                                      "created": currentorder?.created
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>Customer Name is required</Form.Control.Feedback>
                          </FloatingLabel>

                          

                          <FloatingLabel controlId="Price" label="Price ($)" className="mb-3">
                              <Form.Control required type='number' placeholder='Enter order Price' size='md' value={currentorder?.Price} onChange={(e) => {
                                  setCurrentorder({
                                      "Name": currentorder?.CustomerName,
                                      "Delivery Date": e.target.value,
                                     "Recipient Name": currentorder?.Inventory,
                                      "Recipient Number": currentorder?.RecipientPhone
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>Order Count is required</Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel controlId="Inventory" label="order Count" className="mb-3">
                              <Form.Control required type='number' placeholder='Enter order Count' size='md' value={currentorder?.Inventory} onChange={(e) => {
                                  setCurrentorder({
                                      "Name": currentorder?.CustomerName,
                                      "Delivery Date": currentorder?.DeliveryDate,
                                      "Recipient Name": e.target.value,
                                      "Recipient Number": currentorder?.RecipientPhone
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>Order Count is required</Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel controlId="Type" label="Type" className="mb-3">
                              <Form.Control required type='text' placeholder='Enter order Type' size='md' value={currentorder?.Type} onChange={(e) => {
                                  setCurrentorder({
                                      "Name": currentorder?.CustomerName,
                                      "Delivery Date": currentorder?.DeliveryDate,
                                      "Inventory": currentorder?.Inventory,
                                      "Type": e.target.value
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>order Count is required</Form.Control.Feedback>
                          </FloatingLabel>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button type="submit">{(addEditFormType === 'Add') ? 'Add' : 'Update'}</Button>
                      </Modal.Footer>
                  </Form>
              </Modal>
           </ErrorBoundary>
 <ErrorBoundary>
                {/* Delete Confirmation Dialogue START */}
               <Modal show={showDeleteDialogue} onHide={handleModalClose}>
                  <Modal.Header closeButton>
                       <Modal.Title>Delete order</Modal.Title>
                  </Modal.Header> 
                  <Modal.Body> 
                       <p>Are you sure you want to delete {currentorder.id}?</p>
                   </Modal.Body> 
                 <Modal.Footer> 
                     <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleorderDelete}>Yes, Delete</Button>
                 </Modal.Footer> 
             </Modal>
             
 </ErrorBoundary>

 {/* Delete Confirmation Dialogue START */}
                <Modal show={showDetailsForm} onHide={handleModalClose}>
                   <Modal.Header closeButton>
                        <Modal.Title>Order </Modal.Title>
                        <Modal.Title>Order details</Modal.Title>
                   </Modal.Header> 
                   <Modal.Body> 
                        <p>Are you sure you want to delete {currentorder.id}?</p>
                    </Modal.Body> 
                  <Modal.Footer> 
                      <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                     <Button variant="danger" onClick={handleorderDelete}>Yes, Delete</Button>
                  </Modal.Footer> 
              </Modal>
              <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-orders-center">
                      <div className="align-orders-center" style={{ marginRight: 8 }}>

                          <h4 style={{ marginTop: 8, }}>View Orders</h4>
                      </div>
                     
                      <Form>
          <InputGroup className='my-3'>

            {/* onChange for search */}

            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Orders'
            />
          </InputGroup>
        </Form>


                  </Card.Header>
                  <Card.Body>
                   <ErrorBoundary>
                      <Table responsive>
                      <thead>
                        <tr>
                             <th>Order number</th>
                             <th>Customer Name</th>
                             <th>Date Ordered</th>
                             <th>Recipient Name</th>
                             <th>Recipient Phone</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                          <tbody>
                            
                              { (orders.map((order, index) => (

                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      {console.log(order.doc.data.value.mapValue.fields.CustomerName.stringValue)}
                                       <td>{order.doc.data.value.mapValue.fields.CustomerName.stringValue}</td>
                                      <td>{order.doc.data.value.mapValue.fields.DeliveryDate.stringValue}</td>
                                       <td>{order.doc.data.value.mapValue.fields.RecipientName.stringValue}</td>
                                     <td>{order.doc.data.value.mapValue.fields.RecipientPhone.stringValue}</td>
                                      <td>
                                      <Button variant= 'primary' onClick={()=>{
                                      setShowDetailsForm(true);
                                      }}>Details</Button>{' '}
                                          <Button variant='primary' onClick={() => {
                                              setCurrentorderId(order.doc.key.path.segments[order.doc.key.path.segments.length - 1])
                                              setCurrentorder({
                                                  "Name": order.doc.data.value.mapValue.fields.Name.stringValue,
                                                  "Delivery Date": order.doc.data.value.mapValue.fields.Type.stringValue,
                                                  "Recipient Name": order.doc.data.value.mapValue.fields.Type.stringValue,
                                                  "Recipient Number": order.doc.data.value.mapValue.fields.Type.stringValue
                                              });
                                              setAddEditFormType("Edit");
                                              setShowAddEditForm(true);
                                          }}>✎ Edit</Button>{' '}
                                          <Button variant='danger' onClick={() => {
                                              setCurrentorderId(order.doc.key.path.segments[order.doc.key.path.segments.length - 1]);
                                              setCurrentorder({
                                                   "Name": order.doc.data.value.mapValue.fields.Name.stringValue,
                                                    "Delivery Date": order.doc.data.value.mapValue.fields.Type.stringValue,
                                                     "Recipient Name": order.doc.data.value.mapValue.fields.Type.stringValue,
                                                    "Recipient Number": order.doc.data.value.mapValue.fields.Type.stringValue
                                                });
                                              setShowDeleteDialogue(true);
                                          }}>x Delete</Button>
                                      </td>
                                  </tr>
                              )))}
                          </tbody>

                          
                      </Table>
                      </ErrorBoundary>
                  </Card.Body>
              </Card>
              </React.Fragment></>}
      </>
  );
}

export default ViewOrders;