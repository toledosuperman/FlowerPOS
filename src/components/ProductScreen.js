import React, { useEffect, useState } from 'react'
import { ProductContainerStyle, PageHeading } from '../components/styles/ProductScreen'
import ProductItem from '../components/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { Spinner } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';
import { CartContainerStyle } from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import {  useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {onSnapshot, collection, addDoc, Timestamp,} from 'firebase/firestore';
import { listProducts } from './productActions'
const ProductScreen = (onClose,open) => {
  const dispatch = useDispatch()

  const navigate = useNavigate();
  useEffect(() =>
      onSnapshot(collection(db, "Products"), (snapshot) => console.log(snapshot.docs)
    ));
  
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
  const [isLoading, setIsLoading] = useState(false);
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
          <PageHeading primary>Create Recipe</PageHeading>
          <ProductContainerStyle primary>
            {products.map((item) => (
              <ProductItem item={item} />
            ))}
          </ProductContainerStyle>
        </>
      )}
      <Link to="/cart">
              <Button variant="primary">
                Finalize Recipe
              </Button>
              </Link>
              </> 
             
      
    
</React.Fragment></>}
</>)
  
}

export default ProductScreen