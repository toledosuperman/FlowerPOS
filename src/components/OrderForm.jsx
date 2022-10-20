import {db} from '../components/Firebase/firebase'
import { collection, doc, addDoc } from "firebase/firestore"; 
import React, { useState, useEffect } from "react";


const OrderForm = (userName) => {
 
  const [customername  , Setcustomername] = useState("");
  const [customeraddress , Setcustomeraddress] = useState("");
  const [customercity , Setcustomercity] = useState("");
  const [customerstate  , Setcustomerstate] = useState("");
  const [customerzip , Setcustomerzip] = useState("");
  const [customerphone , Setcustomerphone] = useState("");
  const [customeremail  , Setcustomeremail] = useState("");
  const [recipientname  , Setrecipientname] = useState("");
  const [recipientaddress , Setrecipientaddress] = useState("");
  const [recipientcity , Setrecipientcity] = useState("");
  const [recipientstate , Setrecipientstate] = useState("");
  const [recipientzip , Setrecipientzip] = useState("");
  const [recipientphone , Setrecipientphone] = useState("");
  const [product, Setproduct] = useState("");
  const [deliverydate , Setdeliverydate] = useState("");
  const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const docRef = await addDoc(collection(db, "Orders"), {
            CustomerName: customername,
            CustomerAddress: customeraddress,
            CustomerCity: customercity,
            CustomerState: customerstate,
            CustomerZip: customerzip,
            CustomerPhone: customerphone,
            CustomerEmail: customeremail,
            RecipientName: recipientname,
            RecipientAddress: recipientaddress,
            RecipientCity: recipientcity,
            RecipientState: recipientstate,
            RecipientZip: recipientzip,
            RecipientPhone: recipientphone,
            Product: product,
            DeliveryDate: deliverydate
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      


  


return (
  
  <form 
  onSubmit={handleSubmit}>
    <div className='max-w-[700px] mx-auto my-16 p-4'>
    <h1>Customer Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer Name</label>
  <input onChange={(e)=>{Setcustomername(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer Address</label>
  <input onChange={(e)=>{Setcustomeraddress(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer City</label>
  <input onChange={(e)=>{Setcustomercity(e.target.value)}} />
</div>
 <div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">State</label>
  <input onChange={(e)=>{Setcustomerstate(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Zip</label>
  <input  onChange={(e)=>{Setcustomerzip(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Phone</label>
  <input  onChange={(e)=>{Setcustomerphone(e.target.value)}}/>
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Email</label>
  <input  onChange={(e)=>{Setcustomeremail(e.target.value)}} />
</div>
<h1>Recipient Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> Name</label>
  <input  onChange={(e)=>{Setrecipientname(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> Address</label>
  <input   onChange={(e)=>{Setrecipientaddress(e.target.value)}}/>
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> City</label>
  <input   onChange={(e)=>{Setrecipientcity(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">State</label>
  <input   onChange={(e)=>{Setrecipientstate(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Zip</label>
  <input  onChange={(e)=>{Setrecipientzip(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Phone</label>
  <input   onChange={(e)=>{Setrecipientphone(e.target.value)}}/>
</div>
<h1>Product Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> Product</label>
  <input  onChange={(e)=>{Setproduct(e.target.value)}}/>
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> Delivery Date</label>
  <input  onChange={(e)=>{Setdeliverydate(e.target.value)}} /> 
</div>
<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Submit
        </button>
</div>
</form>
   
 
    
  );
  

}}

export default OrderForm;