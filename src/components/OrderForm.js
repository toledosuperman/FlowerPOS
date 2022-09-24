import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function OrderForm() {
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

    </Form>

    
  );
  function CustomerForm() {
    return (
      <Form>
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
}

export default BasicExample;