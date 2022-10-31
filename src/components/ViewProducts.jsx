import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { db } from "../firebase.js";
import { collection, getDocs} from "firebase/firestore";
import NoLoggedInView from '../components/NoLoggedInView';
import { getAuth } from "firebase/auth";
import { Spinner } from 'react-bootstrap';

function ViewProducts ()  {
  const auth = getAuth();
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);
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
    <div class="container ">
    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
    <div class="row ">
     
     <div class="col-sm-3 mt-5 mb-4 text-gred">
        <div className="search">
          <form class="form-inline">
           <input class="form-control mr-sm-2" type="search" placeholder="View Product" aria-label="Search"/>
          
          </form>
        </div>    
        </div>  
        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b>View Products</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Link to="/createrecipe">
              <Button variant="primary">
                Create A Recipe
              </Button>
              </Link>
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                 {products.map((product) => ( 
            
                    <thead key={product.id}>
                        <tr>
                            <th>#</th>
                            <th>Product Name: {product.data.Name}</th>
                            <th>Product Cost: {product.data.Cost}</th>
                            <th>Product Price: {product.data.Price}</th>
                            <th>Product Type: {product.data.Type}</th>
                            <th>Actions</th>
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


export default ViewProducts;