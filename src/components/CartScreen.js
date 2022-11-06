import React, { useEffect,useState } from 'react'
import { CartContainerStyle, PageHeading } from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom';
import Navbar from './Nav/navbar';
import {db} from '../firebase'
import {onSnapshot, collection, addDoc, Timestamp,} from 'firebase/firestore';
import { listProducts } from './productActions'


function CartScreen ({onClose,open})  {
  const navigate = useNavigate();
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
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
 
const[ProductName, setProductName]= useState('');
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await addDoc(collection(db, 'Products'), {
      ProductName: ProductName,
      Countable: true,
      Type: 'Arrangement',
      created: Timestamp.now()
    })
    navigate('/account')
  } catch (err) {
    alert(err)
  }}

;

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
          <form onSubmit={handleSubmit}className='CreateRecipe' name='CreateRecipe'onClose={onClose} open={open}>
          <div className="form-floating">
<textarea className="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setProductName(e.target.value.toUpperCase())} 
        value={ProductName}></textarea>
<label htmlFor="comment">Product Name</label>

</div>
          <CartContainerStyle>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </CartContainerStyle>
          <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-quarter p-4 my-2 text-white'>
        Submit
      </button>
          </form>
        </>
      )}
    </>
    </fragment>
  )
}

export default CartScreen