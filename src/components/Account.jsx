import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect} from 'react';
import { db} from "../firebase.js";
import { collection, getDocs, orderBy, limit, query} from "firebase/firestore";
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { Spinner, Card } from 'react-bootstrap';

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
      const q = query(orderCollectionRef, orderBy('created', 'desc'), limit(10))
      getDocs(q)
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
   
  

    <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-Products-center">
                      <div className="align-Products-center" style={{ marginRight: 8 }}>
                          
                          <h4 style={{ marginTop: 8, }}>Welcome to Flower POS!</h4>
                      </div></Card.Header><Card.Body>
      {/* <p>User Name: { auth.currentUser?.displayName}</p> */}
      <p>User Email: {user && user.email}</p>

      <Link to='/order' className='underline'>
      <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-half p-4 my-2 text-white'>
          Start New Order
        </button>
        </Link></Card.Body></Card>
    
    <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-Products-center">
                      <div className="align-Products-center" style={{ marginRight: 8 }}>
                          
                          <h4 style={{ marginTop: 8, }}>Recent Orders</h4>
                      </div></Card.Header><Card.Body>
            <div className="row">
                <div className="table-responsive " >
                 <table className="table table-striped table-hover table-bordered overflow-x:scroll ">
                 <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Recipient Name</th>
                            <th>Date Created</th>
                          
                            
                        </tr>
                    </thead>
                    <tbody>
                 {orders.map((order) => (
                    <tr key={order.id}>
                            <td>{order.data.CustomerName}</td>
                            <td>{order.data.RecipientName}</td>
                            <td>{order.data.created.toDate().toDateString()}</td>
                            
                        </tr>

                    ))}
                    </tbody>
                    </table>
                        
                    
            </div>
        </div>
        </Card.Body></Card>
      

      
</React.Fragment></>}
;</>)
  ;}


export default ViewOrders;