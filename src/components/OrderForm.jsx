import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { getDatabase, ref, set } from "firebase/database"; 

  const OrderForm = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    function writeOrderData(orderNumber, customerName, customerAddress, customerCity, customerState, 
      customerZip, customerPhone) {
      const db = getDatabase();
      set(ref(db, 'orderdata/' + orderNumber), {
        customername: customerName,
        customeraddress : customerAddress,
        customercity: customerCity,
        customerstate: customerState,
        customerzip: customerZip,
        customerphone: customerPhone,
        recipientname: recipientname,
        recipientaddress: recipientAddress,
        recipientcity: recipientCity,
        recipientstate: recipientState,
        recipientzip: recipientZip,
        recipientphone: recipientPhone,
        deliverydate: deliveryDate,
        product: product
      });
    }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Order Number</Form.Label>
        <Form.Control type="Order Number"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control type="Customer Name"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control type="Customer Address"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer City</Form.Label>
        <Form.Control type="Customer City"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer State</Form.Label>
        <Form.Control type="Customer State"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer Zip</Form.Label>
        <Form.Control type="Customer Zip"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer Phone</Form.Label>
        <Form.Control type="Customer Phone"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Recipient Name</Form.Label>
          <Form.Control type="Recipient Name"/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Recipient Address</Form.Label>
          <Form.Control type="recipient Address"/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Recipient City</Form.Label>
          <Form.Control type="Recipient City"/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Recipient State</Form.Label>
          <Form.Control type="Recipient State"/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Recipient Zip</Form.Label>
          <Form.Control type="Recipient Zip"/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Recipient Phone Number</Form.Label>
          <Form.Control type="Recipient Phone Number"/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Delivery Date</Form.Label>
          <Form.Control type="Delivery Date"/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Product</Form.Label>
          <Form.Control type="Product"/>
        </Form.Group>
    </Form>

    
  );
  
  
}

export default OrderForm;