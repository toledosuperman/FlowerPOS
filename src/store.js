import {  combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { listCartItemsReducer } from './components/cartReducer'
import { productListReducer } from './components/productReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
const allReducers = combineReducers({
  cartItemsList: listCartItemsReducer,
  productsList: productListReducer
})

const initialState = {}

const middleware = [thunk]

const store = configureStore(
  {reducer: allReducers},
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store