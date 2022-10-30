
import React, {  useEffect,useState } from "react";
import FirestoreService from '../components/FirestoreService';
import { Table, Card, Image, Button, Modal, Form, FloatingLabel, Spinner } from 'react-bootstrap';
import NoLoggedInView from '../components/NoLoggedInView';
import { getAuth } from "firebase/auth";



 function CreateRecipe(props) {
  
  const auth = getAuth();
  const user = auth.currentUser;
   
    const [Products, setProducts] = useState([]);
    const [ProductCategories, setProductCategories] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [currentProduct, setCurrentProduct] = useState({
        "Name": '',
        "Type": '',
        "Price": 0
    });
    const [currentProductId, setCurrentProductId] = useState("");

    
   


    function fetchProductCategories() {
        setIsLoading(true);
        FirestoreService.getAllProductCategories().then((response) => {
            setIsLoading(false);
            setProductCategories(response._delegate._snapshot.docChanges);
        }).catch((e) => {
            setIsLoading(false);
            alert("Error occured while fetching the menu categories. " + e);
        })
    }

    function fetchProducts() {
        setIsLoading(true);
        FirestoreService.getAllProducts().then((response) => {
            setIsLoading(false);
            setProducts(response._delegate._snapshot.docChanges);
        }).catch((e) => {
            setIsLoading(false);
            alert("Error occured while fetching the menu item. " + e);
        })
    }

    useEffect(() => {
        if (user !== null) {
            if (ProductCategories.length <= 0) {
                fetchProductCategories();
            }
            fetchProducts();
        }
    }, [user])

    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
    const [validated, setValidated] = useState(false);

    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

    const handleModalClose = () => {
        setShowAddEditForm(false);
        setShowDeleteDialogue(false);
        setCurrentProductId("");
        setAddEditFormType("Add");
        setCurrentProduct({ "Name": '', "Type": '', "Price": 0 })
        setIsLoading(false);
    }

    const handleAddEditFormSubmit = (e) => {
        e.preventDefault();
        const { Name, Type,Price } = e.target.elements;

        if (Price.value && Name.value) {
            if (addEditFormType === "Add") {
                setIsLoading(true);
                FirestoreService.AddNewProduct(Name.value, Type.value, Price.value).then(() => {
                    alert(`${Name.value} is successfully added.`)
                    handleModalClose();
                    window.location.reload(false);
                }).catch((e) => {
                    alert("Error occured: " + e.message);
                    setIsLoading(false);
                })
            } else if (addEditFormType === "Edit") {
                setIsLoading(true);
                FirestoreService.UpateProduct(currentProductId, Name.value, Type.value, Price.value).then(() => {
                    alert(`${Name.value} is successfully updated.`);
                    handleModalClose();
                    window.location.reload(false);
                }).catch((e) => {
                    alert("Error occured: " + e.message);
                    setIsLoading(false);
                })
            }
        }
        setValidated(true)
    }

    const handleProductDelete = () => {
        setIsLoading(true);
        FirestoreService.DeleteProduct(currentProductId).then(() => {
            alert(`Deletion Successful`);
            handleModalClose();
            window.location.reload(false);
        }).catch((e) => {
            alert("Error occured: " + e.message);
            setIsLoading(false);
        })
    }

return (
  <>
  
  {(user === null) && <NoLoggedInView />}
  {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
  {(user !== null) && <>
      {/* Add/Edit Form START */}
      <Modal show={showAddEditForm} onHide={handleModalClose}>
          <Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
              <Modal.Header closeButton>
                  <Modal.Title>{(addEditFormType === 'Add') ? 'Add Product' : 'Edit'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <FloatingLabel controlId="Name" label="Name" className="mb-3" >
                      <Form.Control required type='text' placeholder='Enter product name' size='md' value={currentProduct?.Name} onChange={(e) => {
                          setCurrentProduct({
                              "Name": (e.target.value) ? e.target.value : '',
                              "Type": currentProduct?.Type,
                              "Price": currentProduct?.Price
                          })
                      }} />
                      <Form.Control.Feedback type='invalid'>Product name is required</Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="Type" label="Item Type" className="mb-3" >
                      <Form.Select value={currentProduct?.Type} onChange={(e) => {
                          setCurrentProduct({
                              "Name": currentProduct?.Name,
                              "Type": e.target.value,
                              "Price": currentProduct?.Price
                          })
                      }}>
                          {(ProductCategories) && (ProductCategories.map((ProductCategory, index) => (
                              // Num.integerValue
                              <option key={index} value={ProductCategory.doc.data.value.mapValue.fields.Name.stringValue}>
                                  {ProductCategory.doc.data.value.mapValue.fields.Name.stringValue}</option>
                          )))}
                      </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel controlId="Price" label="Price" className="mb-3">
                      <Form.Control required type='text' placeholder='Enter item price' size='md' value={currentProduct?.Price} onChange={(e) => {
                          setCurrentProduct({
                              "Name": currentProduct?.Name,
                              "Type": currentProduct?.Type,
                              "Price": e.target.value
                          })
                      }} />
                      <Form.Control.Feedback type='invalid'>Item Price is required</Form.Control.Feedback>
                  </FloatingLabel>
              </Modal.Body>
              <Modal.Footer>
                  <Button type="submit">{(addEditFormType === 'Add') ? 'Add' : 'Update'}</Button>
              </Modal.Footer>
          </Form>
      </Modal>
      {/* Add/Edit Form END */}

      {/* Delete Confirmation Dialogue START */}
      <Modal show={showDeleteDialogue} onHide={handleModalClose}>
          <Modal.Header closeButton>
              <Modal.Title>Delete {currentProduct.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>Are you sure you want to delete {currentProduct.Name}?</p>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
              <Button variant="danger" onClick={handleProductDelete}>Yes, Delete</Button>
          </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Dialogue END */}

      <Card style={{ margin: 24 }}>
          <Card.Header className="d-flex justify-content-between align-items-center">
              {/* <div className="align-items-center" style={{ marginRight: 8 }}>
                  <Image src={'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Nandos_logo.svg/1200px-Nandos_logo.svg.png'} style={{ width: 80 }} />
                  <h4 style={{ marginTop: 8, }}>Dashboard</h4>
              </div> */}
              <Button style={{ backgroundColor: '#000', borderWidth: 0, }} onClick={() => {
                  setShowAddEditForm(true);
              }}>Add New Product</Button>
          </Card.Header>
          <Card.Body>
              <Table responsive>
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Type</th>
                          <th>Price </th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {(Products) && (Products.map((Product, index) => (
                          <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{Product.doc.data.value.mapValue.fields.Name.stringValue}</td>
                              <td>{Product.doc.data.value.mapValue.fields.Type.stringValue}</td>
                              <td>{Product.doc.data.value.mapValue.fields.Price.doubleValue ? Product.doc.data.value.mapValue.fields.Price.doubleValue : Product.doc.data.value.mapValue.fields.Price.integerValue}</td>
                              <td>
                                  <Button variant='primary' onClick={() => {
                                      setCurrentProductId(Product.doc.key.path.segments[Product.doc.key.path.segments.length - 1])
                                      setCurrentProduct({
                                          "Name": Product.doc.data.value.mapValue.fields.Name.stringValue,
                                          "Type": Product.doc.data.value.mapValue.fields.Type.stringValue,
                                          "Price": Product.doc.data.value.mapValue.fields.Price.doubleValue ? Product.doc.data.value.mapValue.fields.Price.doubleValue : Product.doc.data.value.mapValue.fields.Price.integerValue
                                      });
                                      setAddEditFormType("Edit");
                                      setShowAddEditForm(true);
                                  }}>✎ Edit</Button>{' '}
                                  <Button variant='danger' onClick={() => {
                                      setCurrentProductId(Product.doc.key.path.segments[Product.doc.key.path.segments.length - 1]);
                                      setCurrentProduct({
                                          "Name": Product.doc.data.value.mapValue.fields.Name.stringValue,
                                          "Type": Product.doc.data.value.mapValue.fields.Type.stringValue,
                                          "Price": Product.doc.data.value.mapValue.fields.Price.doubleValue ? Product.doc.data.value.mapValue.fields.Price.doubleValue : Product.doc.data.value.mapValue.fields.Price.integerValue
                                      });
                                      setShowDeleteDialogue(true);
                                  }}>x Delete</Button>
                              </td>
                          </tr>
                      )))}
                  </tbody>
              </Table>
          </Card.Body>
          {/* <Card.Footer className="d-flex justify-content-between align-items-center">
              <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}>Nandos Menu v1.0.0 - <a href="/login">Logout</a></p>
          </Card.Footer> */}
      </Card>
  </>}
</>
);
}
  
//  <form onSubmit={handleSubmit}className='CreateRecipe' name='CreateRecipe'onClose={onClose} open={open}>
//   <div className='max-w-[700px] mx-auto my-16 p-4'>
//   <h1>Create New Recipe</h1>
// <div class="form-floating">
// <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setName(e.target.value.toUpperCase())} 
//         value={Name}></textarea>
// <label for="comment">Product Name</label>

// </div>
// <FloatingLabel controlId="ProductCategory" label="Product Category" className="mb-3" >
//                                 <Form.Select value={currentProduct?.ProductCategory} onChange={(e) => {
//                                     setCurrentProduct({
//                                         "Name": currentProduct?.Name,
//                                         "Type": e.target.value,
//                                         "Price": currentProduct?.Price
//                                     })
//                                 }}>
//                                     {(ProductCategories) && (ProductCategories.map((ProductCategory, index) => (
//                                         // catNum.integerValue
//                                         <option key={index} value={ProductCategory.doc.data.value.mapValue.fields.Name.stringValue}>
//                                             {ProductCategory.doc.data.value.mapValue.fields.Name.stringValue}</option>
//                                     )))}
//                                 </Form.Select>
//                             </FloatingLabel>
// {/* <div className="App">
//       <Select
//         defaultValue={selectedOption}
//         onChange={setSelectedOption}
//         options={products.map((product) => ( 
//           <option key={product.id}>
//             {product.data.Name}
//           </option>))}
//       />
//     </div> */}


// <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
//         Submit
//       </button>
// </div>
// </form> 
 

  
// );


// }
 export default CreateRecipe;