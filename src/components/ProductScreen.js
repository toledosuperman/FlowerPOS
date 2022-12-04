import React, { useEffect, useState} from 'react'
import { ProductContainerStyle } from '../components/styles/ProductScreen'
import ProductItem from '../components/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Spinner, Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { UserAuth } from '../context/AuthContext';
import { listCartItems } from '../components/cartActions'
import { listProducts } from './productActions'
import  { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'

//create recipe page
const ProductScreen = () => {
  const dispatch = useDispatch()

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
    <div style={{ backgroundImage: `url(${background})`,
  
  backgroundSize:"contain", 
  }}>
    <Navbar />
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          
          <Card style={{ margin: 24 }}>
         
                  <Card.Header className="d-flex justify-content-between align-Products-center"><div className="align-Products-center" style={{ marginRight: 8 }}>
                  <h4 style={{ marginTop: 8, }}>Create Recipe</h4></div></Card.Header>
                  <Card.Body>
                   
         
          


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
          
              </Card>
              
        </>
      )}
   </> </div>
  
    </React.Fragment>
    </>}
;</>)
    
  ;
  
}

export default ProductScreen