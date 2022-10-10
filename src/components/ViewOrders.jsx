import { initializeApp, db } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

function ViewOrders({ values, submit }) {


return (

<div className='max-w-[700px] mx-auto my-16 p-4'>
      <h1>View Orders</h1>

        <React.Fragment>
        <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <th key={index}>Table heading</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
                <tr>
                  <td>2</td>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
                <tr>
                  <td>3</td>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
            </React.Fragment>

            </ div>
  );

};

export default ViewOrders;