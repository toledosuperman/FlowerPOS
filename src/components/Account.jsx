import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, db} from "../firebase.js";
import { collection, getDocs, orderBy, limit, query, where} from "firebase/firestore";
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { Spinner, Card } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import Footer from './footer';
import "./account.css";
function ViewOrders ()  {
  
  const [isLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [orders, setOrders] = useState([])
  const [name, setName] = useState("");
  
  useEffect(() => {
    if (loading) return;
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.posusername);
      } catch (err) {
        console.error(err);
        toast.error("An error occured while fetching user data");
      }
    };
    fetchUserName();
  }, [user, loading]);
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
<React.Fragment><div style={{ backgroundImage: `url(${background})`,
  
  backgroundSize:"contain", 
  }}>
   <Navbar />
   
  

    <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-Products-center">
                      <div className="align-Products-center" style={{ marginRight: 8 }}>
                          
                          <h4 style={{ marginTop: 8, }}>Welcome to Flower POS!</h4>
                      </div></Card.Header><Card.Body>
      {/* <p>User Name: { auth.currentUser?.displayName}</p> */}
      <p>User: {name}</p>

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
        <Toaster toastOptions={{
    success: {
      style: {
        background: 'green',
      },
    },
    error: {
      style: {
        background: 'red',
      },
    },
  }}/>

      </div>
       <Footer />
</React.Fragment></>}
;</>)
  ;}


export default ViewOrders;