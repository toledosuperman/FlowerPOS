import React, { useEffect, useState , useCallback} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card, Button, Modal, Form, FloatingLabel, Spinner, InputGroup} from 'react-bootstrap';
import Navbar from './navbar';
import { UserAuth } from '../context/AuthContext';
import FirestoreService from './FirestoreService.js';
import NoLoggedInView from './NoLoggedInView.js';
import toast, { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
function ViewProducts() {
    const { user } = UserAuth();
  const [Products, setProducts] = useState([]);
const [  setSearch] = useState([])

  

  const [isLoading, setIsLoading] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
      Name: " ",
      Price: 0,
      Inventory: 0,
      Type: " "

  });
  const [currentProductId, setCurrentProductId] = useState([]);



 

  const fetchProducts = useCallback(() =>{
      setIsLoading(true);
     
      FirestoreService.getAllProducts().then((response) => {
          setIsLoading(false);
          setProducts(response._snapshot.docChanges);
          console.log(response._snapshot.docChanges)
          console.log(currentProductId)
         
      }).catch((e) => {
          setIsLoading(false);
          toast.error("Error occurred while fetching the menu Product. " + e);
      })
  }, [currentProductId]);

  useEffect(() => {
      if (user !== null) {
          
          fetchProducts();
      }
  }, [user, fetchProducts])

  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
  const [validated, setValidated] = useState(false);

  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const handleModalClose = () => {
      setShowAddEditForm(false);
      setShowDeleteDialogue(false);
      setShowDetailsForm(false);
      setCurrentProductId("");
      setAddEditFormType("Add");
      setCurrentProduct({ Name: " ", Price: 0, Inventory: 0, Type: " "})
      setIsLoading(false);
  }

  const handleAddEditFormSubmit = (e) => {
      e.preventDefault();
      const { Name, Price, Inventory, Type } = e.target.elements;

      if (Price.value && Name.value) {
          if (addEditFormType === "Add") {
              setIsLoading(true);
              return FirestoreService.AddNewProduct(Name.value, Price.value, Inventory.value, Type.value).then(() => {
                  toast.success(`${Name.value} is successfully added.`)
                  handleModalClose();
                  window.location.reload(false);
              }).catch((e) => {
                  toast.error("Error occured: " + e.message);
                  setIsLoading(false);
              })
          } else if (addEditFormType === "Edit") {
              setIsLoading(true);
              return FirestoreService.UpdateProduct(currentProductId, Name.value, Price.value, Inventory.value, Type.value).then(() => {
                  toast.success(`${Name.value} is successfully updated.`);
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

  const handleProductDelete = async (e) => {
    e.preventDefault();
      setIsLoading(true);
      try {
          await Promise.resolve(FirestoreService.DeleteProduct(currentProductId));
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
                          <Modal.Title>{(addEditFormType === 'Add') ? 'Add Product' : 'Edit'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <FloatingLabel controlId="Name" label="Product Name" className="mb-3" >
                              <Form.Control required type='text' placeholder='Enter Product Name' size='md' value={currentProduct?.Name} onChange={(e) => {
                                  setCurrentProduct({
                                      "Name": e.target.value,
                                      
                                      
                                      
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>Product Name is required</Form.Control.Feedback>
                          </FloatingLabel>

                          

                          <FloatingLabel controlId="Price" label="Price ($)" className="mb-3">
                              <Form.Control required type='number' placeholder='Enter Product Price' size='md' value={currentProduct?.Price} onChange={(e) => {
                                  setCurrentProduct({
                                      
                                      "Price": e.target.value,
                                      
                                      
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>Product Price is required</Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel controlId="Inventory" label="Product Count" className="mb-3">
                              <Form.Control required type='number' placeholder='Enter Product Count' size='md' value={currentProduct?.Inventory} onChange={(e) => {
                                  setCurrentProduct({
                                      
                                      
                                      "Inventory": e.target.value,
                                      
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>Product Count is required</Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel controlId="Type" label="Type" className="mb-3">
                              <Form.Control required type='text' placeholder='Enter Product Type' size='md' value={currentProduct?.Type} onChange={(e) => {
                                  setCurrentProduct({
                                      
                                      
                                      
                                      "Type": e.target.value
                                  })
                              }} />
                              <Form.Control.Feedback type='invalid'>Product Type is required</Form.Control.Feedback>
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
                      <Modal.Title>Delete Product</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <p>Are you sure you want to delete {currentProduct.Name}?</p>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                      <Button variant="danger" onClick={handleProductDelete}>Yes, Delete</Button>
                  </Modal.Footer>
              </Modal>

             {/* Product details */}
             <Modal show={showDetailsForm} onHide={handleModalClose}>
                   <Modal.Header closeButton>
                   <Modal.Title>Product Details</Modal.Title>
                   </Modal.Header> 
                   <Modal.Body>

                        <p>
                        Product Name: {currentProduct?.Name}            <br />
                        Product Price: {currentProduct?.Price}           <br />
                        Product Count: {currentProduct?.Inventory}          <br />
                        Product Type: {currentProduct?.Type}          <br />
                        </p>
                    </Modal.Body> 
                  <Modal.Footer> 
                      <Button variant="danger" onClick={handleModalClose}>Stop Viewing</Button>
                  </Modal.Footer> 
              </Modal>

              <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-Products-center">
                      <div className="align-Products-center" style={{ marginRight: 8 }}>
                          
                          <h4 style={{ marginTop: 8, }}>View Products</h4>
                          
                      </div>
                      <Form>
          <InputGroup className='my-3'>
          <Button style={{ backgroundColor: '#0d6efd', borderWidth: 0, marginRight: 25, }} onClick={() => {
                          setShowAddEditForm(true);
                      }}>Add New Product</Button>
            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Products'
              style={{ width: 350, }}
            />
          </InputGroup>
        </Form>
                  </Card.Header>
                  <Card.Body>
                      <Table responsive className="table table-striped">
                      <thead>
                        <tr><th>#</th>
                             <th>Product Name</th>
                             <th>Product Price ($)</th>
                             <th>Product Count</th>
                             <th>Product Type</th>
                             <th>Actions</th></tr>
                     </thead>
                          <tbody>
                            {/* <tr><td><input type='text' onChange={(e)=>changeSearch(e.target.value)}></input></td></tr> */}
                              { (Products.map((product, index) => (
                                  <tr key={index}>
                                      <td>{index + 1}</td>
                                      {console.log(product.doc.data.value.mapValue.fields.Name.stringValue)}
                                      <td>{product.doc.data.value.mapValue.fields.Name.stringValue}</td>
                                      <td>{product.doc.data.value.mapValue.fields.Price.doubleValue ? product.doc.data.value.mapValue.fields.Price.doubleValue : product.doc.data.value.mapValue.fields.Price.integerValue}</td>
                                      <td>{product.doc.data.value.mapValue.fields.Inventory.doubleValue ? product.doc.data.value.mapValue.fields.Inventory.doubleValue : product.doc.data.value.mapValue.fields.Inventory.integerValue}</td>
                                      <td>{product.doc.data.value.mapValue.fields.Type.stringValue}</td> 
                                      <td>
                                      <Button variant= 'success' onClick={()=>{
                                      setCurrentProductId(product.doc.key.path.segments[product.doc.key.path.segments.length - 1])
                                      setCurrentProduct({
                                        "Name": product.doc.data.value.mapValue.fields.Name.stringValue,
                                        "Price": product.doc.data.value.mapValue.fields.Price.doubleValue ? product.doc.data.value.mapValue.fields.Price.doubleValue : product.doc.data.value.mapValue.fields.Price.integerValue,
                                        "Inventory": product.doc.data.value.mapValue.fields.Inventory.doubleValue ? product.doc.data.value.mapValue.fields.Inventory.doubleValue : product.doc.data.value.mapValue.fields.Inventory.integerValue,
                                        "Type": product.doc.data.value.mapValue.fields.Type.stringValue
                                      });
                                      setShowDetailsForm(true);
                                      }}>Details</Button>{' '}
                                          <Button variant='primary' onClick={() => {
                                              setCurrentProductId(product.doc.key.path.segments[product.doc.key.path.segments.length - 1])
                                              setCurrentProduct({
                                                  "Name": product.doc.data.value.mapValue.fields.Name.stringValue,
                                                  "Price": product.doc.data.value.mapValue.fields.Price.doubleValue ? product.doc.data.value.mapValue.fields.Price.doubleValue : product.doc.data.value.mapValue.fields.Price.integerValue,
                                                  "Inventory": product.doc.data.value.mapValue.fields.Inventory.doubleValue ? product.doc.data.value.mapValue.fields.Inventory.doubleValue : product.doc.data.value.mapValue.fields.Inventory.integerValue,
                                                  "Type": product.doc.data.value.mapValue.fields.Type.stringValue
                                              });
                                              setAddEditFormType("Edit");
                                              setShowAddEditForm(true);
                                          }}>✎ Edit</Button>{' '}
                                          <Button variant='danger' onClick={() => {
                                              setCurrentProductId(product.doc.key.path.segments[product.doc.key.path.segments.length - 1]);
                                              setCurrentProduct({
                                                  "Name": product.doc.data.value.mapValue.fields.Name.stringValue,
                                                  "Price": product.doc.data.value.mapValue.fields.Price.doubleValue ? product.doc.data.value.mapValue.fields.Price.doubleValue : product.doc.data.value.mapValue.fields.Price.integerValue,
                                                  "Inventory": product.doc.data.value.mapValue.fields.Inventory.doubleValue ? product.doc.data.value.mapValue.fields.Inventory.doubleValue : product.doc.data.value.mapValue.fields.Inventory.integerValue,
                                                  "Type": product.doc.data.value.mapValue.fields.Type.stringValue
                                                });
                                              setShowDeleteDialogue(true);
                                          }}>x Delete</Button>
                                      </td>
                                  </tr>
                              )))}
                          </tbody>
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
              </React.Fragment></>}
      </>
  );
}

export default ViewProducts;