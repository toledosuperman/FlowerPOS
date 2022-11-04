import React, { useEffect, useState } from 'react'
import { ProductContainerStyle, PageHeading } from '../components/styles/ProductScreen'
import ProductItem from '../components/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from './productActions'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { Spinner } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';
const ProductScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = UserAuth();
  const dispatch = useDispatch()

  const productsList = useSelector((state) => state.productsList)

  const { loading, error, products } = productsList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (<>
    {(user === null) && <NoLoggedInView />}
   {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
   {(user !== null) && <> 
    <fragment>
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
</fragment></>}
</>)
  
}

export default ProductScreen