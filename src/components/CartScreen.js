import React, { useEffect} from 'react'
import { CartContainerStyle, PageHeading } from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './navbar';
import { listProducts } from './productActions'


function CartScreen ()  {
  const dispatch = useDispatch()
  
  const cartItemsList = useSelector((state) => state.cartItemsList)

  const { loading, error, cartItems } = cartItemsList

  useEffect(() => {
    dispatch(listCartItems())
  }, [dispatch])
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
 



;

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
          <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-quarter p-4 my-2 text-white'>
        Submit
      </button>
          
        </>
      )}
    </>
    </React.Fragment>
  )
}

export default CartScreen