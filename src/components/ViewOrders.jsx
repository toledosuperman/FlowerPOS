import { initializeApp, db } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

import Table from 'react-bootstrap/Table';
import TableWithAPI from './APITable.js';

const ViewOrders = () => {


return (

 <div className='max-w-[600px] mx-auto my-16 p-4'>
              <h1 className='text-2xl font-bold py-4'>View orders</h1>

    < TableWithAPI />
</div>

);
};

export default ViewOrders;