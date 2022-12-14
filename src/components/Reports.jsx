import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, db} from "../firebase.js";
import Navbar from './navbar';
import NoLoggedInView from './NoLoggedInView';
import { Spinner, Card} from 'react-bootstrap';
import  { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import Footer from './footer';
import "./account.css";
import { collection, getDocs, 
  // orderBy, limit,
   query, where} from "firebase/firestore";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

//fetch data and calendar constants
function Reports ()  {
  const [isLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [orders, setOrders] = useState([])
 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
   const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        const orderCollectionRef = collection(db,'Orders')
          const q = query(orderCollectionRef, 
            where("created", ">=", start), where("created", "<=", end
            ));
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

 



  useEffect(() => {
    if (loading) return;
  }, [user, loading]);
  //display page
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
                          
                          <h4 style={{ marginTop: 8, }}>Reports</h4>
                        

                           <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
        />
                          
                      </div></Card.Header><Card.Body>
                      <div className="row">
                <div className="table-responsive " >
                 <table className="table table-striped table-hover table-bordered overflow-x:scroll ">
                 <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price ($)</th>
                            <th>Cost ($)</th>
                            <th>Date Sold</th>
                          
                            
                        </tr>
                    </thead>
                    <tbody>
                 {orders.map((order) => (
                    <tr key={order.id}>
                            <td>{order.data.Product}</td>
                            <td>{order.data.Price}</td>
                            <td>{order.data.Cost}</td>
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



export default Reports;