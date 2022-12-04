import React, { useEffect, useState} from 'react'
import { ProductContainerStyle } from '../components/styles/ProductScreen'
import ProductItem from '../components/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Spinner, Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
// import { Spinner } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';
import { listCartItems } from '../components/cartActions'
// import {db} from '../firebase'
// import { collection, addDoc, Timestamp,} from 'firebase/firestore';
import { listProducts } from './productActions'
import  { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'

//create recipe page
const ProductScreen = () => {
  const dispatch = useDispatch()
  // const[Name, setName]= useState('');
  // const[Inventory, setInventory]= useState('');
  // const[Price, setPrice]= useState('');
  const cartItemsList = useSelector((state) => state.cartItemsList)
  const { loading, error} = cartItemsList

  useEffect(() => {
    dispatch(listCartItems())
  }, [dispatch])
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
 
  
  const [isLoading] = useState(false);
  const { user } = UserAuth();

  const productsList = useSelector((state) => state.productsList)

  const {  products } = productsList

  
  return (<>
 
    {(user === null) && <NoLoggedInView />}
   {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
   {(user !== null) && <>
    <React.Fragment>
    <Navbar />
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          
          <Card style={{ margin: 24 }}>
          <div style={{ backgroundImage: `url(${background})`,
  
  backgroundSize:"contain", 
  }}>
                  <Card.Header className="d-flex justify-content-between align-Products-center"><div className="align-Products-center" style={{ marginRight: 8 }}>
                  <h4 style={{ marginTop: 8, }}>Create Recipe</h4></div></Card.Header>
                  <Card.Body>
                    {/* <Form onSubmit={handleProductSubmit}className='CreateRecipe' name='CreateRecipe'> */}
          <div className='max-w-[700px] mx-auto my-16 p-4'>
          {/* <div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setName(e.target.value)} 
        value={Name}></textarea>
<label htmlFor="comment">Product Name</label>

</div>
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setInventory(e.target.value)} 
        value={Inventory}></textarea>
<label htmlFor="comment">Starting Inventory Count</label>
</div>
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setPrice(e.target.value)} 
        value={Price}></textarea>
<label htmlFor="comment">Starting Price</label>
</div> */}
</div>

<Container>
      <Row className="justify-content-md-center">
      <Col md="auto">
      <Link to="/cart">
              <Button variant="primary" size="lg">
                Finalize Recipe
              </Button>
              
              </Link>
              </Col>
              </Row>
              </Container>
              
          <ProductContainerStyle primary >
            {products.map((item) => (
              <ProductItem item={item} key={item.id}/>
            ))}
          </ProductContainerStyle>
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
          {/* </Form> */}
          </Card.Body>
          </div>
              </Card>
              
        </>
      )}
   </> 
  
    </React.Fragment>
    </>}
;</>)
    
  ;
  
}

export default ProductScreen