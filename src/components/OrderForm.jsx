import { addDoc, collection, doc, setdoc } from "firebase/firestore"; 
import { getDatabase, ref, set } from "firebase/database";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';




function OrderForm({ values, submit }) {
  // initialize react-hook-form
  const db = getDatabase();
  const { register, reset } = useForm();
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [customername  , Setcustomername] = useState("");
  const [customeraddress , Setcustomeraddress] = useState("");
  const [customercity , Setcustomercity] = useState("");
  const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const docRef = await addDoc(collection(db, "Orders"), {
            CustomerName: customername,
            CustomerAddress: customeraddress,
            CustomerCity: customercity
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
  useEffect(() => {
    reset(values);
  }, [values]);

  // call container submit handler to save new/updated values
  const onSubmit = (submittedData) => {
    submit(submittedData);
  };




return (
  
  <form 
  onSubmit={handleSubmit}>
    <div className='max-w-[700px] mx-auto my-16 p-4'>
    <h1>Customer Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer Name</label>
  <input type="text" onChange={(e)=>{Setcustomername(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer Address</label>
  <input type="text" onChange={(e)=>{Setcustomeraddress(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer City</label>
  <input type="text" onChange={(e)=>{Setcustomercity(e.target.value)}} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">State</label>
  <input type="text" {...register("CustomerState")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Zip</label>
  <input type="text" {...register("CustomerZip")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Phone</label>
  <input type="text" {...register("CustomerPhone")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Email</label>
  <input type="text" {...register("CustomerEmail")} />
</div>
<h1>Recipient Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> Name</label>
  <input type="text" {...register("RecipientName")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> Address</label>
  <input type="text" {...register("RecipientAddress")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> City</label>
  <input type="text" {...register("RecipientCity")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">State</label>
  <input type="text" {...register("RecipientState")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Zip</label>
  <input type="text" {...register("RecipientZip")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Phone</label>
  <input type="text" {...register("RecipientPhone")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Email</label>
  <input type="text" {...register("RecipientEmail")} />
</div>
<h1>Product Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> Product</label>
  <input type="text" {...register("Product")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment"> Delivery Date</label>
  <input type="text" {...register("DeliveryDate")} />
</div>
<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Submit
        </button>
</div>
</form>
   
    
    
  );
  
};

export default OrderForm;