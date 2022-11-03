
import { useForm } from "react-hook-form";
import React, {  useState } from "react";
import {  useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import Navbar from './Nav/navbar';

function OrderForm({ values, onClose,open}) {
  // initialize react-hook-form
  const {  reset} = useForm();
  const[CustomerName, setCustomerName]= useState('');
  const[ CustomerCity,setCustomerCity ]= useState('');
  const[ CustomerAddress,setCustomerAddress]= useState('');
  const[ CustomerState,setCustomerState]= useState('');
  const[ CustomerZip,setCustomerZip]= useState('');
  const[  CustomerEmail,setCustomerEmail]= useState('');
  const[ CustomerPhone,setCustomerPhone]= useState('');
  const[ RecipientName,setRecipientName]= useState('');
  const[ RecipientAddress,setRecipientAddress]= useState('');
  const[ RecipientCity,setRecipientCity]= useState('');
  const[ RecipientState,setRecipientState]= useState('');
  const[ RecipientZip,setRecipientZip]= useState('');
  const[ RecipientPhone,setRecipientPhone]= useState('');
  const[ Product,setProduct]= useState('');
  const[ DeliveryDate,setDeliveryDate]= useState('');
  const navigate = useNavigate();
 
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Orders'), {
        CustomerName: CustomerName,
        CustomerAddress: CustomerAddress,
        CustomerCity: CustomerCity,
        CustomerState: CustomerState,
        CustomerZip: CustomerZip,
        CustomerPhone: CustomerPhone,
        CustomerEmail: CustomerEmail,
        RecipientName: RecipientName,
        RecipientAddress: RecipientAddress,
        RecipientCity: RecipientCity,
        RecipientState: RecipientState,
        RecipientZip: RecipientZip,
        RecipientPhone: RecipientPhone,
        Product: Product,
        DeliveryDate: DeliveryDate,
        completed: false,
        created: Timestamp.now()
      })
      navigate('/account')
    } catch (err) {
      alert(err)
    }}

  


return (
<fragment>
<Navbar />
  <form onSubmit={handleSubmit}className='OrderForm' name='OrderForm'onClose={onClose} open={open}>
    <div className='max-w-[700px] mx-auto my-16 p-4'>

    <h1>Customer Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setCustomerName(e.target.value.toUpperCase())} 
          value={CustomerName}></textarea>
  <label for="comment">Customer Name</label>
  {/* <input type="text" onChange={(e) => setCustomerName(e.target.value.toUpperCase())} 
          value={CustomerName} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerAddress(e.target.value.toUpperCase())} 
          value={CustomerAddress}></textarea>
  <label for="comment">Customer Address</label>
  {/* <input type="text" onChange={(e) => setCustomerAddress(e.target.value.toUpperCase())} 
          value={CustomerAddress} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setCustomerCity(e.target.value.toUpperCase())} 
          value={CustomerCity}></textarea>
  <label for="comment">Customer City</label>
  {/* <input type="text" onChange={(e) => setCustomerCity(e.target.value.toUpperCase())} 
          value={CustomerCity} /> */}
</div>
 <div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerState(e.target.value.toUpperCase())} 
          value={CustomerState}></textarea>
  <label for="comment">State</label>
  {/* <input type="text" onChange={(e) => setCustomerState(e.target.value.toUpperCase())} 
          value={CustomerState} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerZip(e.target.value.toUpperCase())} 
          value={CustomerZip}></textarea>
  <label for="comment">Zip</label>
  {/* <input type="text" onChange={(e) => setCustomerZip(e.target.value.toUpperCase())} 
          value={CustomerZip} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerPhone(e.target.value.toUpperCase())} 
          value={CustomerPhone} ></textarea>
  <label for="comment">Phone</label>
  {/* <input type="text" onChange={(e) => setCustomerPhone(e.target.value.toUpperCase())} 
          value={CustomerPhone} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerEmail(e.target.value.toUpperCase())} 
          value={CustomerEmail} ></textarea>
  <label for="comment">Email</label>
  {/* <input type="text" onChange={(e) => setCustomerEmail(e.target.value.toUpperCase())} 
          value={CustomerEmail} /> */}
</div>
<h1>Recipient Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientName(e.target.value.toUpperCase())} 
          value={RecipientName}></textarea>
  <label for="comment"> Name</label>
  {/* <input type="text" onChange={(e) => setRecipientName(e.target.value.toUpperCase())} 
          value={RecipientName} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setRecipientAddress(e.target.value.toUpperCase())} 
          value={RecipientAddress}></textarea>
  <label for="comment"> Address</label>
  {/* <input type="text" onChange={(e) => setRecipientAddress(e.target.value.toUpperCase())} 
          value={RecipientAddress} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientCity(e.target.value.toUpperCase())} 
          value={RecipientCity}></textarea>
  <label for="comment"> City</label>
  {/* <input type="text" onChange={(e) => setRecipientCity(e.target.value.toUpperCase())} 
          value={RecipientCity}/> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientState(e.target.value.toUpperCase())} 
          value={RecipientState}></textarea>
  <label for="comment">State</label>
  {/* <input type="text" onChange={(e) => setRecipientState(e.target.value.toUpperCase())} 
          value={RecipientState} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientZip(e.target.value.toUpperCase())} 
          value={RecipientZip}></textarea>
  <label for="comment">Zip</label>
  {/* <input type="text" onChange={(e) => setRecipientZip(e.target.value.toUpperCase())} 
          value={RecipientZip} /> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientPhone(e.target.value.toUpperCase())} 
          value={RecipientPhone}></textarea>
  <label for="comment">Phone</label>
  {/* <input type="text" onChange={(e) => setRecipientPhone(e.target.value.toUpperCase())} 
          value={RecipientPhone} /> */}
</div>
<h1>Product Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setProduct(e.target.value.toUpperCase())} 
          value={Product}></textarea>
  <label for="comment"> Product</label>
  {/* <input type="text" onChange={(e) => setProduct(e.target.value.toUpperCase())} 
          value={Product}/> */}
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setDeliveryDate(e.target.value.toUpperCase())} 
          value={DeliveryDate}></textarea>
  <label for="comment"> Delivery Date</label>
  {/* <input type="text" onChange={(e) => setDeliveryDate(e.target.value.toUpperCase())} 
          value={DeliveryDate} /> */}
</div>
<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Submit
        </button>
</div>
</form>
   
</fragment>
    
  );
  

}

export default OrderForm;