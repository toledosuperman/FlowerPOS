import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { db } from "../firebase.js";
import { collection, getDocs} from "firebase/firestore";
import Table from 'react-bootstrap/Table';
import { handleNew, handleEdit } from "./utils";
import Navbar from './Nav/navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { Spinner } from 'react-bootstrap';

function ViewOrders ()  {
  const [isLoading, setIsLoading] = useState(false);
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
<fragment>
   <Navbar />
    <div class="container ">
    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
    <div class="row ">

     <div class="col-sm-3 mt-5 mb-4 text-gred">
        <div className="search">
          <form class="form-inline">
           <input class="form-control mr-sm-2" type="search" placeholder="View Orders" aria-label="Search"/>

          </form>
        </div>
        </div>
        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b>View Products</b></h2></div>

           </div>
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered overflow-x:scroll ">
                 {orders.map((order) => (

                    <thead key={order.id}>
                        <tr>
                            <th>#</th>
                            <th>Customer Name: {order.data.CustomerName}</th>
                            <th>Customer Phone: {order.data.CustomerPhone}</th>
                            <th>Customer Email: {order.data.CustomerEmail}</th>
                            <th>Customer Address: {order.data.CustomerAddress}</th>
                            <th>Customer City: {order.data.CustomerCity}</th>
                            <th>Customer Zip code: {order.data.CustomerZip}</th>
                            <th>Customer State: {order.data.CustomerState}</th>
                            <th>Product: {order.data.Product}</th>
                            <th>Delivery Date: {order.data.DeliveryDate}</th>
                            <th>Delivery Finished: {order.data.completed.toString()}</th>
                            <th>Delivery Ordered: {order.data.created.toDate().getMonth()+'/'+order.data.created.toDate().getDate()+'/'+order.data.created.toDate().getFullYear()}</th>
                            <th>Recipient Name: {order.data.RecipientName}</th>
                            <th>Recipient Phone: {order.data.RecipientPhone}</th>

                            <th>Recipient Address: {order.data.RecipientAddress}</th>
                            <th>Recipient City: {order.data.RecipientCity}</th>
                            <th>Recipient Zip code: {order.data.RecipientZip}</th>
                            <th>Recipient State: {order.data.RecipientState}</th>
                            <th><a href="#" onClick={() => handleEdit(order.id)}>
                                              edit
                                            </a>{" "}</th>
                        </tr>
                    </thead>))}
                    </table>
                     <tbody>

                        <tr>

                               <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>

                                <a href="#" class="inactivate " title="Inactivate " data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xf070;</i></a>


                        </tr>
                    </tbody>

            </div>
        </div>
       </div>
      </div>

      
</fragment></>}
;</>)
  ;}


export default ViewOrders;