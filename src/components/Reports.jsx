import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth} from "../firebase.js";
import Navbar from './navbar';
import NoLoggedInView from './NoLoggedInView';
import { Spinner, Card } from 'react-bootstrap';
import  { Toaster } from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import Footer from './footer';
import "./account.css";

function Reports ()  {
  const [isLoading] = useState(false);
  const [user] = useAuthState(auth);

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
                          
                          <h4 style={{ marginTop: 8, }}>Hello There</h4>
                      </div></Card.Header><Card.Body>
           
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