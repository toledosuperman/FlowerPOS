import React, { useEffect, useState , useCallback} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Button, Modal, Form, FloatingLabel, Spinner, InputGroup} from 'react-bootstrap';
import Navbar from './navbar';
import { UserAuth } from '../context/AuthContext';
import FirestoreService from './FirestoreService.js';
import NoLoggedInView from './NoLoggedInView.js';
import toast, { Toaster } from 'react-hot-toast';
function ViewOrders() {
    const { user } = UserAuth();
  const [Orders, setOrders] = useState([]);
const [ setSearch] = useState([])


  const [isLoading, setIsLoading] = useState(false);

  const [currentOrder, setCurrentOrder] = useState({
  "CustomerAddress": " ",
          "CustomerCity": " ",
          "CustomerEmail": " ",
          "CustomerName": " ",
          "CustomerPhone": " ",
          "CustomerState": " ",
          "CustomerZip": " ",
          "DeliveryDate": " ",
          "Product": " ",
          "RecipientAddress": " ",
          "RecipientCity": " ",
         "RecipientName": " ",
         "RecipientPhone": " ",
          "RecipientState": " ",
          "RecipientZip": " ",
            "completed": " ",
          "created": " "
  });
  const [currentOrderId, setCurrentOrderId] = useState([]);

  const fetchOrders = useCallback(() =>{
      setIsLoading(true);
     
      FirestoreService.getAllOrders().then((response) => {
          setIsLoading(false);
          setOrders(response._snapshot.docChanges);
          console.log(response._snapshot.docChanges)
          console.log(currentOrderId)
         
      }).catch((e) => {
          setIsLoading(false);
          toast("Error occurred while fetching the menu order. " + e);
      })
  }, [currentOrderId]);

  useEffect(() => {
      if (user !== null) {
          
          fetchOrders();
      }
  }, [user, fetchOrders])

  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
  const [validated, setValidated] = useState(false);

  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
 const [showDetailsForm, setShowDetailsForm] = useState(false);
  const handleModalClose = () => {
      setShowAddEditForm(false);
      setShowDeleteDialogue(false);
      setShowDetailsForm(false);
      setCurrentOrderId("");
      setAddEditFormType("Add");
      setCurrentOrder({ CustomerAddress: " ", CustomerCity: " ",CustomerEmail: " ", CustomerName: " ",
      CustomerPhone: " ", CustomerState: " ", CustomerZip: " ", DeliveryDate: " ", Product: " ", RecipientAddress: " ",
       RecipientCity: " ",RecipientName: " ",RecipientPhone: " ", RecipientState: " ", RecipientZip: " ", completed: " ",
         created: " "})
      setIsLoading(false);
  }

  const handleAddEditFormSubmit = (e) => {
      e.preventDefault();
      const { CustomerAddress,CustomerCity,CustomerEmail,CustomerName,
             CustomerPhone,CustomerState, CustomerZip,Product,
             RecipientAddress, RecipientCity,RecipientName,RecipientPhone,RecipientState,
             RecipientZip, created } = e.target.elements;

      if (addEditFormType === "Edit") {

              setIsLoading(true);
             
             return FirestoreService.UpdateOrder(currentOrderId, CustomerAddress.value,CustomerCity.value,CustomerEmail.value,CustomerName.value,
                                                  CustomerPhone.value,CustomerState.value, CustomerZip.value,Product.value,
                                                  RecipientAddress.value, RecipientCity.value,RecipientName.value,RecipientPhone.value,RecipientState.value,
                                                  RecipientZip.value, created.value).then(() => {
                  toast(`${CustomerName.value} is successfully updated.`);
                  handleModalClose();
                  window.location.reload(false);
              }).catch((e) => {
                  toast("Error occurred: " + e.message);
                  setIsLoading(false);
              })
          }

      setValidated(true)
  }

  const handleOrderDelete = () => {
      setIsLoading(true);
      FirestoreService.DeleteOrder(currentOrderId).then(() => {
          toast(`Deletion Successful`);
          handleModalClose();
          window.location.reload(false);
      }).catch((e) => {
          toast("Error occurred: " + e.message);
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

            <Modal show={showAddEditForm} onHide={handleModalClose}>
               <Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
                  <Modal.Header closeButton>
                  <Modal.Title>{(addEditFormType === 'Add') ? 'Add order' : 'Edit'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <FloatingLabel controlId="CustomerAddress" label="Customer Address" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Customer Address' size='md' value={currentOrder?.CustomerAddress} onChange={(e) => {

                        setCurrentOrder({
                            "CustomerAddress": e.target.value,
                            })
                            }} />
                            <Form.Control.Feedback type='invalid'>Customer Address is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="CustomerCity" label="Customer City" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Customer City' size='md' value={currentOrder?.CustomerCity} onChange={(e) => {

                        setCurrentOrder({
                           "CustomerCity": e.target.value,
                                         })
                                     }} />
                     <Form.Control.Feedback type='invalid'>Customer City is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="CustomerEmail" label="Customer Email" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Customer Email' size='md' value={currentOrder?.CustomerEmail} onChange={(e) => {

                                     setCurrentOrder({
                                         "CustomerEmail": e.target.value,
                                      })
                                }} />
                     <Form.Control.Feedback type='invalid'>Customer Email is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Name" label="Customer Name" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Customer Name' size='md' value={currentOrder?.CustomerName} onChange={(e) => {

                                  setCurrentOrder({
                                      "CustomerName": e.target.value

                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>Customer Name is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Phone" label="Customer Phone" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Customer Phone' size='md' value={currentOrder?.CustomerPhone} onChange={(e) => {

                             setCurrentOrder({
                             "CustomerPhone": e.target.value
                                     })
                                     }} />
                                 <Form.Control.Feedback type='invalid'>Customer Phone is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="State" label="Customer State" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Customer State' size='md' value={currentOrder?.CustomerState} onChange={(e) => {

                                                       setCurrentOrder({
                                                           "CustomerState": e.target.value
                                                       })
                                                   }} />
                     <Form.Control.Feedback type='invalid'>Customer State is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Zip" label="Customer Zip" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Customer zip' size='md' value={currentOrder?.CustomerZip} onChange={(e) => {

                        setCurrentOrder({
                        "CustomerZip": e.target.value
                                                        })
                                                    }} />
                     <Form.Control.Feedback type='invalid'>Customer Zip is required</Form.Control.Feedback>
                     </FloatingLabel>
                      <FloatingLabel controlId="DDate" label="Delivery Date" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Delivery Date' size='md' value={currentOrder?.DeliveryDate} onChange={(e) => {

                                                     setCurrentOrder({
                                                         "Delivery Date": e.target.value
                                                     })
                                                 }} />
                     <Form.Control.Feedback type='invalid'>Delivery Date is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Product" label="Product" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Product' size='md' value={currentOrder?.Product} onChange={(e) => {

                                    setCurrentOrder({
                                        "Product": e.target.value
                                    })
                                }} />
                     <Form.Control.Feedback type='invalid'>Product is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Name" label="Recipient Address" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Recipient Address' size='md' value={currentOrder?.RecipientAddress} onChange={(e) => {

                                    setCurrentOrder({
                                        "RecipientAddress": e.target.value
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Recipient Address is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Name" label="Recipient City" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Recipient City' size='md' value={currentOrder?.RecipientCity} onChange={(e) => {

                                    setCurrentOrder({
                                        "RecipientCity": e.target.value
                                    })
                                }} />
                     <Form.Control.Feedback type='invalid'>Recipient City is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Name" label="Recipient Name" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Recipient Name' size='md' value={currentOrder?.RecipientName} onChange={(e) => {

                                    setCurrentOrder({
                                        "RecipientName": e.target.value,
                                    })
                                }} />
                     <Form.Control.Feedback type='invalid'>Recipient Name is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Name" label="Recipient Phone" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Recipient Phone' size='md' value={currentOrder?.RecipientPhone} onChange={(e) => {

                                    setCurrentOrder({
                                        "RecipientPhone": e.target.value,
                                    })
                                }} />
                     <Form.Control.Feedback type='invalid'>Recipient Phone is required</Form.Control.Feedback>
                     </FloatingLabel>
                     <FloatingLabel controlId="Name" label="Recipient State" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Recipient State' size='md' value={currentOrder?.RecipientState} onChange={(e) => {

                                     setCurrentOrder({

                                         "RecipientState": e.target.value

                                     })
                                 }} />
                     <Form.Control.Feedback type='invalid'>Recipient State is required</Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel controlId="Name" label="Recipient Zip" className="mb-3" >
                      <Form.Control required type='text' placeholder='Enter Recipient Zip' size='md' value={currentOrder?.RecipientZip} onChange={(e) => {

                      setCurrentOrder({
                                        "RecipientZip": e.target.value
                                    })
                                }} />
                      <Form.Control.Feedback type='invalid'>Recipient Zip is required</Form.Control.Feedback>
                      </FloatingLabel>
                       <FloatingLabel controlId="Name" label="completed" className="mb-3" >
                      <Form.Control required type='text' placeholder='Enter if the order is completed' size='md' value={currentOrder?.completed} onChange={(e) => {

                                    setCurrentOrder({

                                        "completed": e.target.value

                                    })
                                }} />
                      <Form.Control.Feedback type='invalid'>Completion status is required</Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel controlId="Name" label="created" className="mb-3" >
                      <Form.Control required type='text' placeholder='Enter creation date' size='md' value={currentOrder?.created} onChange={(e) => {

                                    setCurrentOrder({
                                        "created": e.target.value
                                    })
                                }} />
                      <Form.Control.Feedback type='invalid'>Created is required</Form.Control.Feedback>
                      </FloatingLabel>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button type="submit">{(addEditFormType === 'Add') ? 'Add' : 'Update'}</Button>
                      </Modal.Footer>
                  </Form>
              </Modal>

                {/* Delete Confirmation Dialogue START */}
              <Modal show={showDeleteDialogue} onHide={handleModalClose}>
                  <Modal.Header closeButton>
                       <Modal.Title>Delete order</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                       <p>Are you sure you want to delete {currentOrder.CustomerName}'s order?</p>
                   </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleOrderDelete}>Yes, Delete</Button>
                 </Modal.Footer>
            </Modal>
{/* Order details */}
                <Modal show={showDetailsForm} onHide={handleModalClose}>
                   <Modal.Header closeButton>
                   <Modal.Title>Order Details</Modal.Title>
                   </Modal.Header> 
                   <Modal.Body>

                        <p>
                        Customer Address: {currentOrder?.CustomerAddress} <br />
                        Customer City: {currentOrder?.CustomerCity}           <br />
                        Customer Email: {currentOrder?.CustomerEmail}          <br />
                        Customer Name: {currentOrder?.CustomerName}          <br />
                        Customer Phone: {currentOrder?.CustomerPhone}        <br />
                        Customer State: {currentOrder?.CustomerState}        <br />
                        Customer Zip: {currentOrder?.CustomerZip}          <br />
                        Delivery Date: {currentOrder?.DeliveryDate}        <br />
                        Product: {currentOrder?.Product}                <br />
                        Recipient Address: {currentOrder?.RecipientAddress}    <br />
                        Recipient City: {currentOrder?.RecipientCity}       <br />
                        Recipient Name: {currentOrder?.RecipientName}       <br />
                        Recipient Phone: {currentOrder?.RecipientPhone}     <br />
                        Recipient State: {currentOrder?.RecipientState}     <br />
                        Recipient Zip: {currentOrder?.RecipientZip}       <br />
                        Completion status:{currentOrder?.completed}<br />
                        Created: {currentOrder?.created}<br />
                        </p>
                    </Modal.Body> 
                  <Modal.Footer> 
                      <Button variant="danger" onClick={handleModalClose}>Stop Viewing</Button>
                  </Modal.Footer> 
                  <Toaster toastOptions={{
    className: '',
    style: {
      border: '1px solid #713200',
      padding: '16px',
      color: '#713200',
    },
  }}/>
              </Modal>

              <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-orders-center">
                      <div className="align-orders-center" style={{ marginRight: 8 }}>
                            <h4 style={{ marginTop: 8, }}>View Orders</h4>
                      </div>
                            

                      <Form>
          <InputGroup className='my-3'>
          <Button style={{ backgroundColor: '#0d6efd', borderWidth: 0, marginRight: 25, }} onClick={() => {
                          setShowAddEditForm(true);
                      }}>Add New Order</Button>
            {/* onChange for search */}
        <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search Orders'
            style={{ width: 350, }}
            />
        </InputGroup>
        </Form>
                  </Card.Header>
                  <Card.Body>
                      <Table responsive className="table table-striped">
                      <thead>
                        <tr>
                             <th>Order number</th>
                             <th>Customer Name</th>
                             <th>Delivery Date</th>
                             <th>Recipient Name</th>
                             <th>Recipient Phone</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                          <tbody>
                              { (Orders.map((order, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    {console.log(order.doc.data.value.mapValue.fields.CustomerName.stringValue)}
                                    <td>{order.doc.data.value.mapValue.fields.CustomerName.stringValue}</td>
                                     <td>{Date(order.doc.data.value.mapValue.fields.DeliveryDate.timestampValue)}</td>
                                    <td>{order.doc.data.value.mapValue.fields.RecipientName.stringValue}</td>
                                    <td>{order.doc.data.value.mapValue.fields.RecipientPhone.stringValue}</td>
                                    <td>
                                      <Button variant= 'success' onClick={()=>{
                                      setCurrentOrderId(order.doc.key.path.segments[order.doc.key.path.segments.length - 1])
                                      setCurrentOrder({
                                      "CustomerAddress": order.doc.data.value.mapValue.fields.CustomerAddress.stringValue,
                                      "CustomerCity": order.doc.data.value.mapValue.fields.CustomerCity.stringValue,
                                      "CustomerEmail": order.doc.data.value.mapValue.fields.CustomerEmail.stringValue,
                                      "CustomerName": order.doc.data.value.mapValue.fields.CustomerName.stringValue,
                                      "CustomerPhone": order.doc.data.value.mapValue.fields.CustomerPhone.stringValue,
                                      "CustomerState": order.doc.data.value.mapValue.fields.CustomerState.stringValue,
                                      "CustomerZip": order.doc.data.value.mapValue.fields.CustomerZip.stringValue,
                                    "DeliveryDate": Date(order.doc.data.value.mapValue.fields.DeliveryDate.timestampValue),
                                      "Product": order.doc.data.value.mapValue.fields.Product.stringValue,
                                      "RecipientAddress": order.doc.data.value.mapValue.fields.RecipientAddress.stringValue,
                                      "RecipientCity": order.doc.data.value.mapValue.fields.RecipientCity.stringValue,
                                      "RecipientName": order.doc.data.value.mapValue.fields.RecipientName.stringValue,
                                      "RecipientPhone": order.doc.data.value.mapValue.fields.RecipientPhone.stringValue,
                                      "RecipientState": order.doc.data.value.mapValue.fields.RecipientState.stringValue,
                                      "RecipientZip": order.doc.data.value.mapValue.fields.RecipientZip.stringValue,
                                     "completed": order.doc.data.value.mapValue.fields.completed.booleanValue?order.doc.data.value.mapValue.fields.completed.booleanValue:false,
                                      "created": Date(order.doc.data.value.mapValue.fields.created.timestampValue),
                                      });
                                      setShowDetailsForm(true);
                                      }}>Details</Button>{' '}
                                          <Button variant='primary' onClick={() => {
                                              setCurrentOrderId(order.doc.key.path.segments[order.doc.key.path.segments.length - 1])
                                              setCurrentOrder({
                                              "CustomerAddress": order.doc.data.value.mapValue.fields.CustomerAddress.stringValue,
                                              "CustomerCity": order.doc.data.value.mapValue.fields.CustomerCity.stringValue,
                                              "CustomerEmail": order.doc.data.value.mapValue.fields.CustomerEmail.stringValue,
                                              "CustomerName": order.doc.data.value.mapValue.fields.CustomerName.stringValue,
                                              "CustomerPhone": order.doc.data.value.mapValue.fields.CustomerPhone.stringValue,
                                              "CustomerState": order.doc.data.value.mapValue.fields.CustomerState.stringValue,
                                              "CustomerZip": order.doc.data.value.mapValue.fields.CustomerZip.stringValue,
                                             "DeliveryDate": Date(order.doc.data.value.mapValue.fields.DeliveryDate.timestampValue),
                                              "Product": order.doc.data.value.mapValue.fields.Product.stringValue,
                                              "RecipientAddress": order.doc.data.value.mapValue.fields.RecipientAddress.stringValue,
                                              "RecipientCity": order.doc.data.value.mapValue.fields.RecipientCity.stringValue,
                                              "RecipientName": order.doc.data.value.mapValue.fields.RecipientName.stringValue,
                                              "RecipientPhone": order.doc.data.value.mapValue.fields.RecipientPhone.stringValue,
                                              "RecipientState": order.doc.data.value.mapValue.fields.RecipientState.stringValue,
                                              "RecipientZip": order.doc.data.value.mapValue.fields.RecipientZip.stringValue,
                                            "completed": order.doc.data.value.mapValue.fields.completed.booleanValue?order.doc.data.value.mapValue.fields.completed.booleanValue:false,
                                              "created": order.doc.data.value.mapValue.fields.created.timestampValue,
                                              });
                                              setAddEditFormType("Edit");
                                              setShowAddEditForm(true);
                                          }}>✎ Edit</Button>{' '}
                                          <Button variant='danger' onClick={() => {
                                              setCurrentOrderId(order.doc.key.path.segments[order.doc.key.path.segments.length - 1]);
                                              setCurrentOrder({
                                                    "CustomerAddress": order.doc.data.value.mapValue.fields.CustomerAddress.stringValue,
                                                    "CustomerCity": order.doc.data.value.mapValue.fields.CustomerCity.stringValue,
                                                    "CustomerEmail": order.doc.data.value.mapValue.fields.CustomerEmail.stringValue,
                                                    "CustomerName": order.doc.data.value.mapValue.fields.CustomerName.stringValue,
                                                    "CustomerPhone": order.doc.data.value.mapValue.fields.CustomerPhone.stringValue,
                                                    "CustomerState": order.doc.data.value.mapValue.fields.CustomerState.stringValue,
                                                    "CustomerZip": order.doc.data.value.mapValue.fields.CustomerZip.stringValue,
                                                     "DeliveryDate": Date(order.doc.data.value.mapValue.fields.DeliveryDate.timestampValue),
                                                    "Product": order.doc.data.value.mapValue.fields.Product.stringValue,
                                                    "RecipientAddress": order.doc.data.value.mapValue.fields.RecipientAddress.stringValue,
                                                    "RecipientCity": order.doc.data.value.mapValue.fields.RecipientCity.stringValue,
                                                    "RecipientName": order.doc.data.value.mapValue.fields.RecipientName.stringValue,
                                                    "RecipientPhone": order.doc.data.value.mapValue.fields.RecipientPhone.stringValue,
                                                    "RecipientState": order.doc.data.value.mapValue.fields.RecipientState.stringValue,
                                                    "RecipientZip": order.doc.data.value.mapValue.fields.RecipientZip.stringValue,
                                                    "completed": order.doc.data.value.mapValue.fields.completed.booleanValue?order.doc.data.value.mapValue.fields.completed.booleanValue:false,
                                                    "created": order.doc.data.value.mapValue.fields.created.timestampValue,
                                                });
                                              setShowDeleteDialogue(true);
                                          }}>x Delete</Button>
                                      </td>
                                  </tr>
                              )))}
                          </tbody>
                       <React.Fragment>
                       </React.Fragment>
                      </Table>

                  </Card.Body>
              </Card>
              </React.Fragment></>}
      </>
  );
}

export default ViewOrders;