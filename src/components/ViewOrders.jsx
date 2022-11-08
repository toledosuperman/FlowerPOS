import React from 'react';
import { UserAuth } from '../context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect} from 'react';
import { db } from "../firebase.js";
import { collection, getDocs} from "firebase/firestore";
import {  handleEdit } from "./utils";
import Navbar from './navbar';
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
<React.Fragment>
   <Navbar />
    <div className="container ">
    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
    <div className="row ">

     <div className="col-sm-3 mt-5 mb-4 text-gred">
        <div className="search">
          <form className="form-inline">
           <input className="form-control mr-sm-2" type="search" placeholder="Search Orders" aria-label="Search"/>

          </form>
        </div>
        </div>
        <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b> Orders</b></h2></div>

           </div>
            <div className="row">
                <div className="table-responsive " >
                 <table className="table table-striped table-hover table-bordered overflow-x:scroll ">
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
                            
                            {/* <th>Delivery Ordered: {order.data.created.toDate().getMonth()+'/'+order.data.created.toDate().getDate()+'/'+order.data.created.toDate().getFullYear()}</th> */}
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

                               <a href="#" className="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i className="material-icons">&#xE417;</i></a>

                                <a href="#" className="inactivate " title="Inactivate " data-toggle="tooltip" style={{color:"red"}}><i className="material-icons">&#xf070;</i></a>


                        </tr>
                    </tbody>

            </div>
        </div>
       </div>
      </div>

      
</React.Fragment></>}
;</>)
  ;}


export default ViewOrders;