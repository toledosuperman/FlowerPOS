import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Nav/navbar';

function App() {
  return (

    <div>
      <h1 className='text-center text-3xl font-bold'>
        Welcome to Flower POS
      </h1>

      <navbar />

      <AuthContextProvider>
        <Routes>
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