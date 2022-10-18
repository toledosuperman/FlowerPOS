import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';


const ViewProducts= () => {
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
return (
    
<div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
          <div class="row ">
           
           <div class="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form class="form-inline">
                 <input class="form-control mr-sm-2" type="search" placeholder="Search Item" aria-label="Search"/>
                
                </form>
              </div>    
              </div>  
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"blue"}}><h2><b>View Products</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Link to="/recipe">
              <Button variant="primary" onClick={handleShow}>
                Create A Recipe
              </Button>
              </Link>
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name </th>
                            <th>Item Price</th>
                            <th>Inventory Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            <td>1</td>
                            <td>Flower</td>
                            <td>$50</td>
                            <td>1</td>
                            <td>
                               <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="inactivate " title="Inactivate " data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xf070;</i></a>
                                 
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Flower</td>
                            <td>$50</td>
                            <td>4</td>
                            <td>
                               <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="inactivate " title="Inactivate " data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xf070;</i></a>
                                 
                            </td>
                        </tr>
                         
 
                        <tr>
                            <td>3</td>
                            <td>Flower</td>
                            <td>$50</td>
                            <td>5</td>
                            <td>
                               <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="inactivate " title="Inactivate " data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xf070;</i></a>
                                 
                            </td>
                        </tr>
 
                        <tr>
                            <td>4</td>
                            <td>Flower</td>
                            <td>$50</td>
                            <td>7</td>
                            <td>
                               <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a href="#" class="inactivate " title="Inactivate " data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xf070;</i></a>
                                 
                            </td>
                        </tr>
 
 
                        
                    </tbody>
                </table>
            </div>   
        </div>  
       </div>  
      </div>    
        

  );
};

export default ViewProducts;