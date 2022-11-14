import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect} from 'react';
import { db } from "../firebase.js";
import { collection, getDocs} from "firebase/firestore";
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { Spinner } from 'react-bootstrap';

function ViewOrders ()  {
  
  const [isLoading] = useState(false);
  const { user } = UserAuth();
  const [orders, setOrders] = useState([])
  useEffect(()=>{
  getOrders()
},[])
  useEffect(()=> {
      console.log(orders)
  },[orders]
  )
  function getOrders(){
      const orderCollectionRef = collection(db,'Orders')
      getDocs(orderCollectionRef)
          .then(response =>{
              const ord = response.docs.map(doc => ({
                  data: doc.data(),
                  id: doc.id,
              }))
              setOrders(ord)
          })
          .catch(error => console.log(error.message))
  };

return (<>
  {(user === null) && <NoLoggedInView />}
  {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
  {(user !== null) && <> 
<React.Fragment>
   <Navbar />
   <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email: {user && user.email}</p>

      <Link to='/order' className='underline'>
      <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          New Order
        </button>
        </Link>
    </div>
    <div className="container ">
    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
    <div className="row ">

     
        <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b> Orders</b></h2></div>

           </div>
            <div className="row">
                <div className="table-responsive " >
                 <table className="table table-striped table-hover table-bordered overflow-x:scroll ">
                 <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Recipient Name</th>
                            <th>Date Created</th>
                            {/* <th>Delivery Date</th> */}
                            
                        </tr>
                    </thead>
                    <tbody>
                 {orders.map((order) => (
                    <tr key={order.id}>
                            <td>{order.data.CustomerName}</td>
                            <td>{order.data.RecipientName}</td>
                            <td>{order.data.created.toDate().toDateString()}</td>
                            {/* <td>{order.data.DeliveryDate.timestamp.toDate()}</td> */}
                        </tr>

                    ))}
                    </tbody>
                    </table>
                        

            </div>
        </div>
       </div>
      </div>

      
</React.Fragment></>}
;</>)
  ;}


export default ViewOrders;