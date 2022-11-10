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
import { listCartItems } from '../components/cartActions'
import {db} from '../firebase'
import {onSnapshot, collection} from 'firebase/firestore';
import { listProducts } from './productActions'
const ProductScreen = () => {
  const dispatch = useDispatch()

  
  useEffect(() =>
      onSnapshot(collection(db, "Products"), (snapshot) => console.log(snapshot.docs)
    ));
  
  
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