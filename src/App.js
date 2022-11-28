import React from 'react';
import OrderForm from './components/OrderForm';
import Signin from './components/Signin';
import ViewOrders from './components/ViewOrders';
import ViewUsers from './components/ViewUsers';
import ViewProducts from './components/ViewProducts';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';
// import PasswordForgetPage from './components/PasswordForget';

import Signup from './components/Signup';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import ListCustomers from './components/ListCustomers';
import { AuthContextProvider } from './context/AuthContext';


import Reset from './components/Reset';


function App() {
  return (


  

    <div className="wrapper">

      



      <AuthContextProvider>
        <Routes>
          <Route path="/products"element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
           {/* <Route path='/passwordforget' element={<PasswordForgetPage />} /> */}
          <Route path='/reset' element={<Reset />} />
          <Route path='/order' element={<OrderForm />} />
          <Route path='/vieworders' element={<ViewOrders />} />
          <Route path='/users' element={<ViewUsers />} />
          <Route path='/customers' element={<ListCustomers />} />
          <Route path='/viewproduct' element={<ViewProducts />} />
          <Route path='/createrecipe' element={<ProductScreen />} />
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={
              
                <Account />
              
            }
          />
        </Routes>
      </AuthContextProvider>

    </div>

  );
}

export default App;