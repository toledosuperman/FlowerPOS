import React, { useEffect } from 'react'
import { CartContainerStyle, PageHeading } from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './Nav/navbar';

const CartScreen = () => {
  const dispatch = useDispatch()

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