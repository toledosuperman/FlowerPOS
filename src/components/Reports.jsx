import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, db} from "../firebase.js";
import Navbar from './navbar';
import NoLoggedInView from './NoLoggedInView';
import { Spinner, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import  { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import Footer from './footer';
import "./account.css";
import { collection, getDocs, orderBy, limit, query, where} from "firebase/firestore";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';


function Reports ()  {
  const [isLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [orders, setOrders] = useState([])
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  console.log(state)



  useEffect(() => {
    if (loading) return;
  }, [user, loading]);
  


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

        function getOrdersbyDate(dates){
          const {startDate, endDate} = dates;
          console.log(startDate, endDate)
          if (startDate === undefined && endDate === undefined) {
            getOrders()
            return
          }
          const orderCollectionRef = collection(db,'Orders')
          const q = query(orderCollectionRef, where("created", ">=", startDate), where("created", "<=", endDate));
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
                          
                          <h4 style={{ marginTop: 8, }}>Reports</h4>
                        

                          <DateRangePicker
  onChange={item => setState([item.selection])}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={2}
  ranges={state}
  direction="horizontal"
/>;
                          <DropdownButton id="dropdown-basic-button" title="Select Report">
      <Dropdown.Item href="#/action-1">COGS Report</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Products Report</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Profits and Loss</Dropdown.Item>
    </DropdownButton>
                      </div></Card.Header><Card.Body>
                      <div className="row">
                <div className="table-responsive " >
                 <table className="table table-striped table-hover table-bordered overflow-x:scroll ">
                 <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price ($)</th>
                            <th>Cost ($)</th>
                            <th>Date Created</th>
                          
                            
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