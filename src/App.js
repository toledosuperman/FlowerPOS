import React from 'react';
import OrderForm from './components/OrderForm';
import Signin from './components/Signin';
import ViewOrders from './components/ViewOrders';
import ViewProducts from './components/ViewProducts';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';
// import PasswordForgetPage from './components/PasswordForget';
import CreateRecipe from './components/CreateRecipe';
import Signup from './components/Signup';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import ListCustomers from './components/ListCustomers';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Nav/navbar';
import Reset from './components/Reset';


function App() {
  return (


  

    <div className="wrapper">

      

    <Navbar />

      <AuthContextProvider>
        <Routes>
        <Route exact path="/products">
          <ProductScreen />
          </Route>
        <Route exact path="/cart">
          <CartScreen />
        </Route>
          {/* <Route path='/passwordforget' element={<PasswordForgetPage />} /> */}
          <Route path='/reset' element={<Reset />} />
          <Route path='/order' element={<OrderForm />} />
          <Route path='/vieworders' element={<ViewOrders />} />
          <Route path='/customers' element={<ListCustomers />} />
          <Route path='/viewproduct' element={<ViewProducts />} />
          <Route path='/createrecipe' element={<CreateRecipe />} />
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>

    </div>

  );
}

export default App;