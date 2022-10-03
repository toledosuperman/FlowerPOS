import React from 'react';
import OrderForm from './components/OrderForm';
import Signin from './components/Signin';
import ViewOrders from './components/ViewOrders';
import ViewProducts from './components/ViewProducts';
import Signup from './components/Signup';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <div>
      <h1 className='text-center text-3xl font-bold'>
        Welcome to Flower POS
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path='/order' element={<OrderForm />} />
          <Route path='/vieworder' element={<ViewOrders />} />
          <Route path='/viewproduct' element={<ViewProducts />} />
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