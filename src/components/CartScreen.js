import React, { useEffect,useState } from 'react'
import { CartContainerStyle, PageHeading } from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './Nav/navbar';
import {db} from '../firebase'
import {onSnapshot, collection, addDoc, Timestamp,} from 'firebase/firestore';

const CartScreen = () => {
  useEffect(() =>
      onSnapshot(collection(db, "Products"), (snapshot) => console.log(snapshot.docs)
    ));
  const dispatch = useDispatch()
  const[Name, setName]= useState('');
  const cartItemsList = useSelector((state) => state.cartItemsList)

  const { loading, error, cartItems } = cartItemsList

  useEffect(() => {
    dispatch(listCartItems())
  }, [dispatch])

  return (
    <fragment>
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
        </>
      )}
    </>
    </fragment>
  )
}

export default CartScreen