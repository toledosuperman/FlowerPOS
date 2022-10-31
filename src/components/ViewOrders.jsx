import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect} from 'react';
import { db } from "../firebase.js";
import { collection, getDocs} from "firebase/firestore";
import NoLoggedInView from '../components/NoLoggedInView';
import { getAuth } from "firebase/auth";
import { Table, Card, Image, Button, Modal, Form, FloatingLabel, Spinner } from 'react-bootstrap';
function ViewOrders ()  {
    const auth = getAuth();
    const user = auth.currentUser;
    const [isLoading, setIsLoading] = useState(false);
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

return (
    <>
    
  {(user === null) && <NoLoggedInView />}
  {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
  {(user !== null) && <>
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
        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b>View Orders</b></h2></div>

           </div>
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered overflow-x:scroll ">
                 {orders.map((order) => (

                    <thead key={order.id}>
                        <tr>
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


                            <th>Order Date: {order.data.completed}</th>
                            <th>Recipient Name: {order.data.RecipientName}</th>
                            <th>Recipient Phone: {order.data.RecipientPhone}</th>

                            <th>Recipient Address: {order.data.RecipientAddress}</th>
                            <th>Recipient City: {order.data.RecipientCity}</th>
                            <th>Recipient Zip code: {order.data.RecipientZip}</th>
                            <th>Recipient State: {order.data.RecipientState}</th>

                        </tr>
                    </thead>))}
                    </table>
                     <tbody>

                        <tr>

                               <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="inactivate " title="Inactivate " data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xf070;</i></a>


                        </tr>
                    </tbody>

            </div>
        </div>
       </div>
      </div>

      </>  }</>  

  );}


export default ViewOrders;