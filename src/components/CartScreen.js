import React, { useEffect, useState} from 'react'
import { CartContainerStyle} from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import NoLoggedInView from '../components/NoLoggedInView';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './navbar';
import { Button, Container , Row, Col, Form, Card, Spinner} from 'react-bootstrap';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';
import toast ,{Toaster} from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import { UserAuth } from '../context/AuthContext';

function CartScreen ()  {
  const [isLoading] = useState(false);
  const { user } = UserAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cartItemsList = useSelector((state) => state.cartItemsList)
  const[Name, setName]= useState('');
  const[Inventory, setInventory]= useState('');
  const[Price, setPrice]= useState('');
  const { loading, error, cartItems } = cartItemsList
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Products'), {
        Name: Name,
        Inventory: Number(Inventory),
        Countable: true,
        Type: 'Arrangement',
        Price: Number(Price),
        created: Timestamp.now()
      })
      navigate('/account')
    } catch (err) {
      toast.error(err)
    }}

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await addDoc(collection(db, 'Recipe'), {
        
        
  //       created: Timestamp.now()
  //     })
  //     navigate('/account')
  //   } catch (err) {
  //     toast.error(err)
  //   }}

  useEffect(() => {
    dispatch(listCartItems())
  }, [dispatch])
  
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
                  <h4 style={{ marginTop: 8, }}>Finalize Recipe</h4></div></Card.Header>
                  <Card.Body>
                 
                  
          <CartContainerStyle>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </CartContainerStyle>
          
          <Form onSubmit={handleSubmit}className='CreateRecipe' name='CreateRecipe'>
          <div className='max-w-[700px] mx-auto my-16 p-4'>
          {/* <div className="form-floating">
          
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setPrice(e.target.value)} 
        value={Price}></textarea>
<label htmlFor="comment">My Price</label></div> */}
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setName(e.target.value)} 
        value={Name}></textarea>
<label htmlFor="comment">Product Name</label>

</div>
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="number" placeholder="Comment goes here" onChange={(e) => setInventory(e.target.value)} 
        value={Inventory}></textarea>
<label htmlFor="comment">Starting Inventory Count</label>
</div>
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="number" placeholder="Comment goes here" onChange={(e) => setPrice(e.target.value)} 
        value={Price}></textarea>
<label htmlFor="comment">Starting Price</label>
</div>

</div>
          <Container>
      <Row className="justify-content-md-center">
      <Col md="auto">
              <Button variant="primary">
                Submit
              </Button>
              </Col>
              </Row>
              </Container>
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
              </Form>
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


export default CartScreen