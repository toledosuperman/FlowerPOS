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
      setCurrentorder({ CustomerAddress: " ", CustomerCity: " ",CustomerEmail: " ", CustomerName: " ",
      CustomerPhone: " ", CustomerState: " ", CustomerZip: " ", DeliveryDate: " ", Product: " ", RecipientAddress: " ",
       RecipientCity: " ",RecipientName: " ",RecipientPhone: " ", RecipientState: " ", RecipientZip: " ",
        completed: false, created: 0})
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
             return FirestoreService.AddNewOrder(CustomerAddress.value,CustomerCity.value,CustomerEmail.value,CustomerName.value,
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
             return FirestoreService.UpdateOrder(CustomerAddress.value,CustomerCity.value,CustomerEmail.value,CustomerName.value,
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

            <Modal show={showAddEditForm} onHide={handleModalClose}>
               <Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
                  <Modal.Header closeButton>
                  <Modal.Title>{(addEditFormType === 'Add') ? 'Add order' : 'Edit'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <FloatingLabel controlId="CustomerAddress" label="Customer Address" className="mb-3" >
                     <Form.Control required type='text' placeholder='Enter Customer Address' size='md' value={currentorder?.CustomerAddress} onChange={(e) => {
                        setCurrentorder({
                            "CustomerAddress": e.target.value,
                            "CustomerCity": currentorder?.CustomerCity,
                            "CustomerEmail": currentorder?.CustomerEmail,
                            "CustomerName": currentorder?.CustomerName,
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
                            <Form.Control.Feedback type='invalid'>Customer Address is required</Form.Control.Feedback>
                          </FloatingLabel>
                          <FloatingLabel controlId="CustomerCity" label="Customer City" className="mb-3" >
                                     <Form.Control required type='text' placeholder='Enter Customer City' size='md' value={currentorder?.CustomerCity} onChange={(e) => {
                                         setCurrentorder({
                                             "CustomerAddress": currentorder?.CustomerAddress,
                                             "CustomerCity": e.target.value,
                                             "CustomerEmail": currentorder?.CustomerEmail,
                                             "CustomerName": currentorder?.CustomerName,
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
                                   <Form.Control.Feedback type='invalid'>Customer City is required</Form.Control.Feedback>
                               </FloatingLabel>
                               <FloatingLabel controlId="CustomerEmail" label="Customer Email" className="mb-3" >
                                 <Form.Control required type='text' placeholder='Enter Customer Email' size='md' value={currentorder?.CustomerEmail} onChange={(e) => {
                                     setCurrentorder({
                                         "CustomerAddress": currentorder?.CustomerAddress,
                                         "CustomerCity": currentorder?.CustomerCity,
                                         "CustomerEmail": e.target.value,
                                         "CustomerName": currentorder?.CustomerName,
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
                               <Form.Control.Feedback type='invalid'>Customer Email is required</Form.Control.Feedback>
                               </FloatingLabel>
                          <FloatingLabel controlId="Name" label="Customer Name" className="mb-3" >
                              <Form.Control required type='text' placeholder='Enter Customer Name' size='md' value={currentorder?.CustomerName} onChange={(e) => {
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
                       <FloatingLabel controlId="Phone" label="Customer Phone" className="mb-3" >
                         <Form.Control required type='text' placeholder='Enter Customer Phone' size='md' value={currentorder?.CustomerPhone} onChange={(e) => {
                             setCurrentorder({
                                 "CustomerAddress": currentorder?.CustomerAddress,
                                 "CustomerCity": currentorder?.CustomerCity,
                                 "CustomerEmail": currentorder?.CustomerEmail,
                                 "CustomerName": currentorder?.CustomerPhone,
                                 "CustomerPhone": e.target.value,
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
                                 <Form.Control.Feedback type='invalid'>Customer Phone is required</Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel controlId="State" label="Customer State" className="mb-3" >
                                                   <Form.Control required type='text' placeholder='Enter Customer State' size='md' value={currentorder?.CustomerState} onChange={(e) => {
                                                       setCurrentorder({
                                                           "CustomerAddress": currentorder?.CustomerAddress,
                                                           "CustomerCity": currentorder?.CustomerCity,
                                                           "CustomerEmail": currentorder?.CustomerEmail,
                                                           "CustomerName":currentorder?.CustomerName,
                                                           "CustomerPhone": currentorder?.CustomerPhone,
                                                           "CustomerState": e.target.value,
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
                                                   <Form.Control.Feedback type='invalid'>Customer State is required</Form.Control.Feedback>
                                               </FloatingLabel>
                       <FloatingLabel controlId="Zip" label="Customer Zip" className="mb-3" >
                                                    <Form.Control required type='text' placeholder='Enter Customer zip' size='md' value={currentorder?.CustomerZip} onChange={(e) => {
                                                        setCurrentorder({
                                                            "CustomerAddress": currentorder?.CustomerAddress,
                                                            "CustomerCity": currentorder?.CustomerCity,
                                                            "CustomerEmail": currentorder?.CustomerEmail,
                                                            "CustomerName": currentorder?.CustomerName,
                                                            "CustomerPhone": currentorder?.CustomerPhone,
                                                            "CustomerState": currentorder?.CustomerState,
                                                            "CustomerZip": e.target.value,
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
                                                    <Form.Control.Feedback type='invalid'>Customer Zip is required</Form.Control.Feedback>
                                                </FloatingLabel>
                    <FloatingLabel controlId="DDate" label="Delivery Date" className="mb-3" >
                                                 <Form.Control required type='text' placeholder='Enter Delivery Date' size='md' value={currentorder?.DeliveryDate} onChange={(e) => {
                                                     setCurrentorder({
                                                         "CustomerAddress": currentorder?.CustomerAddress,
                                                         "CustomerCity": currentorder?.CustomerCity,
                                                         "CustomerEmail": currentorder?.CustomerEmail,
                                                         "CustomerName": currentorder?.CustomerName,
                                                         "CustomerPhone": currentorder?.CustomerPhone,
                                                         "CustomerState": currentorder?.CustomerState,
                                                         "CustomerZip": currentorder?.CustomerZip,
                                                         "Delivery Date": e.target.value,
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
                                                 <Form.Control.Feedback type='invalid'>Delivery Date is required</Form.Control.Feedback>
                                             </FloatingLabel>
   <FloatingLabel controlId="Name" label="Product" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter Product' size='md' value={currentorder?.Product} onChange={(e) => {
                                    setCurrentorder({
                                        "CustomerAddress": currentorder?.CustomerAddress,
                                        "CustomerCity": currentorder?.CustomerCity,
                                        "CustomerEmail": currentorder?.CustomerEmail,
                                        "CustomerName":currentorder?.CustomerName,
                                        "CustomerPhone": currentorder?.CustomerPhone,
                                        "CustomerState": currentorder?.CustomerState,
                                        "CustomerZip": currentorder?.CustomerZip,
                                        "Delivery Date": currentorder?.DeliveryDate,
                                        "Product": e.target.value,
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
                                <Form.Control.Feedback type='invalid'>Product is required</Form.Control.Feedback>
                            </FloatingLabel>
   <FloatingLabel controlId="Name" label="Recipient Address" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter Recipient Address' size='md' value={currentorder?.RecipientAddress} onChange={(e) => {
                                    setCurrentorder({
                                        "CustomerAddress": currentorder?.CustomerAddress,
                                        "CustomerCity": currentorder?.CustomerCity,
                                        "CustomerEmail": currentorder?.CustomerEmail,
                                        "CustomerName": currentorder?.CustomerName,
                                        "CustomerPhone": currentorder?.CustomerPhone,
                                        "CustomerState": currentorder?.CustomerState,
                                        "CustomerZip": currentorder?.CustomerZip,
                                        "Delivery Date": currentorder?.DeliveryDate,
                                        "Product": currentorder?.Product,
                                        "RecipientAddress": e.target.value,
                                        "RecipientCity": currentorder?.RecipientCity,
                                        "RecipientName": currentorder?.RecipientName,
                                        "RecipientPhone": currentorder?.RecipientPhone,
                                        "RecipientState": currentorder?.RecipientState,
                                        "RecipientZip": currentorder?.RecipientZip,
                                        "completed": currentorder?.completed,
                                        "created": currentorder?.created
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Recipient Address is required</Form.Control.Feedback>
                            </FloatingLabel>
   <FloatingLabel controlId="Name" label="Recipient City" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter Recipient City' size='md' value={currentorder?.RecipientCity} onChange={(e) => {
                                    setCurrentorder({
                                        "CustomerAddress": currentorder?.CustomerAddress,
                                        "CustomerCity": currentorder?.CustomerCity,
                                        "CustomerEmail": currentorder?.CustomerEmail,
                                        "CustomerName": currentorder?.CustomerName,
                                        "CustomerPhone": currentorder?.CustomerPhone,
                                        "CustomerState": currentorder?.CustomerState,
                                        "CustomerZip": currentorder?.CustomerZip,
                                        "Delivery Date": currentorder?.DeliveryDate,
                                        "Product": currentorder?.Product,
                                        "RecipientAddress": currentorder?.RecipientAddress,
                                        "RecipientCity": e.target.value,
                                        "RecipientName": currentorder?.RecipientName,
                                        "RecipientPhone": currentorder?.RecipientPhone,
                                        "RecipientState": currentorder?.RecipientState,
                                        "RecipientZip": currentorder?.RecipientZip,
                                        "completed": currentorder?.completed,
                                        "created": currentorder?.created
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Recipient City is required</Form.Control.Feedback>
                            </FloatingLabel>
   <FloatingLabel controlId="Name" label="Recipient Name" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter Recipient Name' size='md' value={currentorder?.RecipientName} onChange={(e) => {
                                    setCurrentorder({
                                        "CustomerAddress": currentorder?.CustomerAddress,
                                        "CustomerCity": currentorder?.CustomerCity,
                                        "CustomerEmail": currentorder?.CustomerEmail,
                                        "CustomerName": currentorder?.CustomerName,
                                        "CustomerPhone": currentorder?.CustomerPhone,
                                        "CustomerState": currentorder?.CustomerState,
                                        "CustomerZip": currentorder?.CustomerZip,
                                        "Delivery Date": currentorder?.DeliveryDate,
                                        "Product": currentorder?.Product,
                                        "RecipientAddress": currentorder?.RecipientAddress,
                                        "RecipientCity": currentorder?.RecipientCity,
                                        "RecipientName": e.target.value,
                                        "RecipientPhone": currentorder?.RecipientPhone,
                                        "RecipientState": currentorder?.RecipientState,
                                        "RecipientZip": currentorder?.RecipientZip,
                                        "completed": currentorder?.completed,
                                        "created": currentorder?.created
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Recipient Name is required</Form.Control.Feedback>
                            </FloatingLabel>
   <FloatingLabel controlId="Name" label="Recipient Phone" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter Recipient Phone' size='md' value={currentorder?.RecipientPhone} onChange={(e) => {
                                    setCurrentorder({
                                        "CustomerAddress": currentorder?.CustomerAddress,
                                        "CustomerCity": currentorder?.CustomerCity,
                                        "CustomerEmail": currentorder?.CustomerEmail,
                                        "CustomerName": currentorder?.CustomerName,
                                        "CustomerPhone": currentorder?.CustomerPhone,
                                        "CustomerState": currentorder?.CustomerState,
                                        "CustomerZip": currentorder?.CustomerZip,
                                        "Delivery Date": currentorder?.DeliveryDate,
                                        "Product": currentorder?.Product,
                                        "RecipientAddress": currentorder?.RecipientAddress,
                                        "RecipientCity": currentorder?.RecipientCity,
                                        "RecipientName": currentorder?.RecipientName,
                                        "RecipientPhone": e.target.value,
                                        "RecipientState": currentorder?.RecipientState,
                                        "RecipientZip": currentorder?.RecipientZip,
                                        "completed": currentorder?.completed,
                                        "created": currentorder?.created
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Recipient Phone is required</Form.Control.Feedback>
                            </FloatingLabel>
    <FloatingLabel controlId="Name" label="Recipient State" className="mb-3" >
                                 <Form.Control required type='text' placeholder='Enter Recipient State' size='md' value={currentorder?.RecipientState} onChange={(e) => {
                                     setCurrentorder({
                                         "CustomerAddress": currentorder?.CustomerAddress,
                                         "CustomerCity": currentorder?.CustomerCity,
                                         "CustomerEmail": currentorder?.CustomerEmail,
                                         "CustomerName": currentorder?.CustomerName,
                                         "CustomerPhone": currentorder?.CustomerPhone,
                                         "CustomerState": currentorder?.CustomerState,
                                         "CustomerZip": currentorder?.CustomerZip,
                                         "Delivery Date": currentorder?.DeliveryDate,
                                         "Product": currentorder?.Product,
                                         "RecipientAddress": currentorder?.RecipientAddress,
                                         "RecipientCity": currentorder?.RecipientCity,
                                         "RecipientName": currentorder?.RecipientName,
                                         "RecipientPhone": currentorder?.RecipientPhone,
                                         "RecipientState": e.target.value,
                                         "RecipientZip": currentorder?.RecipientZip,
                                         "completed": currentorder?.completed,
                                         "created": currentorder?.created
                                     })
                                 }} />
                                 <Form.Control.Feedback type='invalid'>Recipient State is required</Form.Control.Feedback>
                             </FloatingLabel>
                             <FloatingLabel controlId="Name" label="Recipient Zip" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter Recipient Zip' size='md' value={currentorder?.RecipientZip} onChange={(e) => {
                                    setCurrentorder({
                                        "CustomerAddress": currentorder?.CustomerAddress,
                                        "CustomerCity": currentorder?.CustomerCity,
                                        "CustomerEmail": currentorder?.CustomerEmail,
                                        "CustomerName": currentorder?.CustomerName,
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
                                        "RecipientZip": e.target.value,
                                        "completed": currentorder?.completed,
                                        "created": currentorder?.created
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Recipient Zip is required</Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="Name" label="completed" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter if the order is completed' size='md' value={currentorder?.completed} onChange={(e) => {
                                    setCurrentorder({
                                        "CustomerAddress": currentorder?.CustomerAddress,
                                        "CustomerCity": currentorder?.CustomerCity,
                                        "CustomerEmail": currentorder?.CustomerEmail,
                                        "CustomerName": currentorder?.CustomerName,
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
                                        "completed": e.target.value,
                                        "created": currentorder?.created
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Completion status is required</Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="Name" label="created" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter creation date' size='md' value={currentorder?.created} onChange={(e) => {
                                    setCurrentorder({
                                        "CustomerAddress": currentorder?.CustomerAddress,
                                        "CustomerCity": currentorder?.CustomerCity,
                                        "CustomerEmail": currentorder?.CustomerEmail,
                                        "CustomerName": currentorder?.CustomerName,
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
                       <p>Are you sure you want to delete {currentorder.CustomerName}'s order?</p>
                   </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleorderDelete}>Yes, Delete</Button>
                 </Modal.Footer>
             </Modal>



 {/* Order details */}
                <Modal show={showDetailsForm} onHide={handleModalClose}>
                   <Modal.Header closeButton>

                        <Modal.Title>Order details</Modal.Title>
                   </Modal.Header> 
                   <Modal.Body> 
                        <p>
                        Customer Address: {currentorder?.CustomerAddress} <br />
                        Customer City: {currentorder?.CustomerCity}           <br />
                        Customer Email: {currentorder?.CustomerEmail}          <br />
                        Customer Name: {currentorder?.CustomerName}          <br />
                        Customer Phone: {currentorder?.CustomerPhone}        <br />
                        Customer State: {currentorder?.CustomerState}        <br />
                        Customer Zip: {currentorder?.CustomerZip}          <br />
                        Delivery Date: {""+currentorder?.DeliveryDate}        <br />
                        Product: {currentorder?.Product}                <br />
                        Recipient Address: {currentorder?.RecipientAddress}    <br />
                        Recipient City: {currentorder?.RecipientCity}       <br />
                        Recipient Name: {currentorder?.RecipientName}       <br />
                        Recipient Phone: {currentorder?.RecipientPhone}     <br />
                        Recipient State: {currentorder?.RecipientState}     <br />
                        Recipient Zip: {currentorder?.RecipientZip}       <br />
                        Completed: {""+currentorder?.completed}           <br />
                        Created: {""+currentorder?.created}<br />
                        </p>
                    </Modal.Body> 
                  <Modal.Footer> 
                      <Button variant="secondary" onClick={handleModalClose}>Stop viewing</Button>
                  </Modal.Footer> 
              </Modal>

              <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-orders-center">
                      <div className="align-orders-center" style={{ marginRight: 8 }}>
                            <h4 style={{ marginTop: 8, }}>View Orders</h4>
                      </div>
                            <Button style={{ backgroundColor: '#000', borderWidth: 0, }} onClick={() => {
                            setShowAddEditForm(true);
                      }}>Add New Order</Button>
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

                      <Table responsive>
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
                                      setCurrentorderId(order.doc.key.path.segments[order.doc.key.path.segments.length - 1])
                                      setCurrentorder({
                                      "CustomerAddress": order.doc.data.value.mapValue.fields.CustomerAddress.stringValue,
                                      "CustomerCity": order.doc.data.value.mapValue.fields.CustomerCity.stringValue,
                                      "CustomerEmail": order.doc.data.value.mapValue.fields.CustomerEmail.stringValue,
                                      "CustomerName": order.doc.data.value.mapValue.fields.CustomerName.stringValue,
                                      "CustomerPhone": order.doc.data.value.mapValue.fields.CustomerPhone.stringValue,
                                      "CustomerState": order.doc.data.value.mapValue.fields.CustomerState.stringValue,
                                      "CustomerZip": order.doc.data.value.mapValue.fields.CustomerZip.stringValue,
                                      "Delivery Date": order.doc.data.value.mapValue.fields.DeliveryDate.stringValue,
                                      "Product": order.doc.data.value.mapValue.fields.Product.stringValue,
                                      "RecipientAddress": order.doc.data.value.mapValue.fields.RecipientAddress.stringValue,
                                      "RecipientCity": order.doc.data.value.mapValue.fields.RecipientCity.stringValue,
                                      "RecipientName": order.doc.data.value.mapValue.fields.RecipientName.stringValue,
                                      "RecipientPhone": order.doc.data.value.mapValue.fields.RecipientPhone.stringValue,
                                      "RecipientState": order.doc.data.value.mapValue.fields.RecipientState.stringValue,
                                      "RecipientZip": order.doc.data.value.mapValue.fields.RecipientZip.stringValue,
                                      "completed": order.doc.data.value.mapValue.fields.Completed,
                                      "created": order.doc.data.value.mapValue.fields.Created,
                                      });
                                      setShowDetailsForm(true);
                                      }}>Details</Button>{' '}
                                          <Button variant='primary' onClick={() => {
                                              setCurrentorderId(order.doc.key.path.segments[order.doc.key.path.segments.length - 1])
                                              setCurrentorder({
                                              "CustomerAddress": order.doc.data.value.mapValue.fields.CustomerAddress.stringValue,
                                              "CustomerCity": order.doc.data.value.mapValue.fields.CustomerCity.stringValue,
                                              "CustomerEmail": order.doc.data.value.mapValue.fields.CustomerEmail.stringValue,
                                              "CustomerName": order.doc.data.value.mapValue.fields.CustomerName.stringValue,
                                              "CustomerPhone": order.doc.data.value.mapValue.fields.CustomerPhone.stringValue,
                                              "CustomerState": order.doc.data.value.mapValue.fields.CustomerState.stringValue,
                                              "CustomerZip": order.doc.data.value.mapValue.fields.CustomerZip.stringValue,
                                              "Delivery Date": order.doc.data.value.mapValue.fields.DeliveryDate.stringValue,
                                              "Product": order.doc.data.value.mapValue.fields.Product.stringValue,
                                              "RecipientAddress": order.doc.data.value.mapValue.fields.RecipientAddress.stringValue,
                                              "RecipientCity": order.doc.data.value.mapValue.fields.RecipientCity.stringValue,
                                              "RecipientName": order.doc.data.value.mapValue.fields.RecipientName.stringValue,
                                              "RecipientPhone": order.doc.data.value.mapValue.fields.RecipientPhone.stringValue,
                                              "RecipientState": order.doc.data.value.mapValue.fields.RecipientState.stringValue,
                                              "RecipientZip": order.doc.data.value.mapValue.fields.RecipientZip.stringValue,
                                              "completed": order.doc.data.value.mapValue.fields.Completed,
                                              "created": order.doc.data.value.mapValue.fields.Created,
                                              });
                                              setAddEditFormType("Edit");
                                              setShowAddEditForm(true);
                                          }}>✎ Edit</Button>{' '}
                                          <Button variant='danger' onClick={() => {
                                              setCurrentorderId(order.doc.key.path.segments[order.doc.key.path.segments.length - 1]);
                                              setCurrentorder({
                                                    "CustomerAddress": order.doc.data.value.mapValue.fields.CustomerAddress.stringValue,
                                                    "CustomerCity": order.doc.data.value.mapValue.fields.CustomerCity.stringValue,
                                                    "CustomerEmail": order.doc.data.value.mapValue.fields.CustomerEmail.stringValue,
                                                    "CustomerName": order.doc.data.value.mapValue.fields.CustomerName.stringValue,
                                                    "CustomerPhone": order.doc.data.value.mapValue.fields.CustomerPhone.stringValue,
                                                    "CustomerState": order.doc.data.value.mapValue.fields.CustomerState.stringValue,
                                                    "CustomerZip": order.doc.data.value.mapValue.fields.CustomerZip.stringValue,
                                                    "Delivery Date": order.doc.data.value.mapValue.fields.DeliveryDate.stringValue,
                                                    "Product": order.doc.data.value.mapValue.fields.Product.stringValue,
                                                    "RecipientAddress": order.doc.data.value.mapValue.fields.RecipientAddress.stringValue,
                                                    "RecipientCity": order.doc.data.value.mapValue.fields.RecipientCity.stringValue,
                                                    "RecipientName": order.doc.data.value.mapValue.fields.RecipientName.stringValue,
                                                    "RecipientPhone": order.doc.data.value.mapValue.fields.RecipientPhone.stringValue,
                                                    "RecipientState": order.doc.data.value.mapValue.fields.RecipientState.stringValue,
                                                    "RecipientZip": order.doc.data.value.mapValue.fields.RecipientZip.stringValue,
                                                    "completed": order.doc.data.value.mapValue.fields.completed,
                                                    "created": order.doc.data.value.mapValue.fields.created,
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