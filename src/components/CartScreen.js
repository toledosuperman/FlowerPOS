import React, { useEffect} from 'react'
import { CartContainerStyle, PageHeading } from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './navbar';
import { Button, Container , Row, Col} from 'react-bootstrap';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';

function CartScreen (onClose, open)  {
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
      alert(err)
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
          <form onSubmit={handleSubmit}className='OrderForm' name='OrderForm'onClose={onClose} open={open}>
          <Container>
      <Row className="justify-content-md-center">
      <Col md="auto">
              <Button variant="primary">
                Submit
              </Button>
              </Col>
              </Row>
              </Container>
              </form>
        </>
      )}
    </>
    </React.Fragment>
  )
}

export default CartScreen