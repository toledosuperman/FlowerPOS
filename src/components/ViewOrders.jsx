
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ViewOrders= () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();
return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>View Orders</h1>
      

      
        
    </div>
  );
};

export default ViewOrders;