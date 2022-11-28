import React, { useEffect, useState} from 'react'
import { CartContainerStyle, PageHeading } from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './navbar';
import { Button, Container , Row, Col, Form} from 'react-bootstrap';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './footer';

function CartScreen ({onClose, open})  {
  const[Price, setPrice]= useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cartItemsList = useSelector((state) => state.cartItemsList)

  const { loading, error, cartItems } = cartItemsList
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Recipe'), {
        
        
        created: Timestamp.now()
      })
      navigate('/account')
    } catch (err) {
      toast.error(err)
    }}

  useEffect(() => {
    dispatch(listCartItems())
  }, [dispatch])
  
  return (
    <React.Fragment>
  <Navbar />
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <PageHeading>Recipe</PageHeading>
          
          <CartContainerStyle>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </CartContainerStyle>
          <Form onSubmit={handleSubmit}className='RecipeForm' name='RecipeForm' onClose={onClose} open={open}>
          <div className='max-w-[700px] mx-auto my-16 p-4'>
          <div className="form-floating">
          <div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setPrice(e.target.value)} 
        value={Price}></textarea>
<label htmlFor="comment">My Price</label>
</div></div>
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
              </Form>
        </>
      )}
    </><Toaster/>
     <Footer />
    </React.Fragment>
  )
}

export default CartScreen