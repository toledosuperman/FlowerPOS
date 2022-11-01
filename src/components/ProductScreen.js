import React, { useEffect } from 'react'
import { ProductContainerStyle, PageHeading } from '../components/styles/ProductScreen'
import ProductItem from '../components/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from './productActions'

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
          <PageHeading primary>Products</PageHeading>
          <ProductContainerStyle primary>
            {products.map((item) => (
              <ProductItem item={item} />
            ))}
          </ProductContainerStyle>
        </>
      )}
    </>
  )
}

export default ProductScreen