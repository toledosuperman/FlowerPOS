import React from 'react';
import OrderForm from './components/OrderForm';
import Signin from './components/Signin';
import ViewOrders from './components/ViewOrders';
import ViewProducts from './components/ViewProducts';
// import PasswordForgetPage from './components/PasswordForget';
import CreateRecipe from './components/CreateRecipe';
import Signup from './components/Signup';
import Account from './components/Account';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD

=======
import ListProducts from './components/ListProduct';
import ListCustomers from './components/ListCustomers';
>>>>>>> e9327bd75644e2173f5f89780835265255d2f6e1
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Nav/navbar';

import Home from './components/home';

function App() {
  return (


  

    <div className="wrapper">

      <h1 className='text-center text-3xl font-bold'>
        Welcome to Flower POS
      </h1>

    <Navbar />

      <AuthContextProvider>
        <Routes>
          <Route path='/home' element={<Home />} />
          {/* <Route path='/passwordforget' element={<PasswordForgetPage />} /> */}
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