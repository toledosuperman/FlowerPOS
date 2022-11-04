import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect} from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import { db } from "../firebase.js";
import { collection, getDocs} from "firebase/firestore";
import NoLoggedInView from '../components/NoLoggedInView';
import { UserAuth } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';
import Navbar from './navbar';
import 'firebase/compat/auth';

function ViewProducts ()  {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = UserAuth();
  
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [products, setProducts] = useState([])
  useEffect(()=>{
  getProducts()
},[])
  useEffect(()=> {
      console.log(products)
  },[products]
  )
  function getProducts(){
      const productCollectionRef = collection(db,'Products')
      getDocs(productCollectionRef)
          .then(response =>{
              const prod = response.docs.map(doc => ({
                  data: doc.data(),
                  id: doc.id,
              }))
              setProducts(prod)
          })
          .catch(error => console.log(error.message))
  };

return (<>
   {(user === null) && <NoLoggedInView />}
  {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
  {(user !== null) && <> 
<fragment>
   <Navbar />
   <>
 
    <div class="container ">
    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
    <div class="row ">

     <div class="col-sm-3 mt-5 mb-4 text-gred">
        <div className="search">
          <form class="form-inline">
           <input class="form-control mr-sm-2" type="search" placeholder="Search Products" aria-label="Search"/>
          
          </form>
        </div>    
        </div>  
        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b>Products</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add Product
              </Button>
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                 <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Cost ($)</th>
                            <th>Product Price ($)</th>
                            <th>Product Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                 {products.map((product) => ( 
            
                    <tbody key={product.id}>
                        <tr>
                            <th>#</th>
                            <td>{product.data.Name}</td>
                            <td>{product.data.Cost}</td>
                            <td>{product.data.Price}</td>
                            <td>{product.data.Type}</td>
                            <td>Actions
                            <tr>
                            
                              
                             <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                             <a href="#" class="inactivate " title="Inactivate " data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xf070;</i></a>
                              
                         
                     </tr>
                            </td>
                        </tr>
                    </tbody>))}
                    </table>

                    </div>   
        </div>  
 
      
      {/* <!--- Model Box ---> */}
      <div className="model_box">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Inventory</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form>
               
                <div class="form-group mt-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Select Product"/>
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Edit Inventory #"/>
                </div>
                
                  <button type="submit" class="btn btn-primary mt-4">Save Changes</button>
                </form>
            </Modal.Body>
 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
  
       {/* Model Box Finsihs */}
       </div>  
      </div>    
      </div>  
 </> 
</fragment></>}
);</>)
}


export default ViewProducts;