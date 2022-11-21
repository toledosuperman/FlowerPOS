import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
  } from './productConstants'
  import { products } from './products'
  import toast from 'react-hot-toast';
  
  export const listProducts = () => async (dispatch) => {
    const productsData = []
  
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
  
      products.forEach((product) => {
        productsData.push(product)
      })
  
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: productsData })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          toast.response && toast.response.data.message ? toast.response.data.message : toast.message
      })
    }
  }