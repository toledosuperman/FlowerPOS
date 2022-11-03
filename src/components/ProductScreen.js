import React, { useEffect } from 'react'
import { ProductContainerStyle, PageHeading } from '../components/styles/ProductScreen'
import ProductItem from '../components/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from './productActions'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ProductScreen = () => {
  const dispatch = useDispatch()

  const productsList = useSelector((state) => state.productsList)

  const { loading, error, products } = productsList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
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
  )
}

export default ProductScreen