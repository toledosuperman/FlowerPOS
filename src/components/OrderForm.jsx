import { initializeApp, db } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";

function OrderForm({ values, submit }) {
  // initialize react-hook-form
  const { register, reset, handleSubmit } = useForm();

  // populate form fields
  useEffect(() => {
    reset(values);
  }, [values]);

  // call container submit handler to save new/updated values
  const onSubmit = (submittedData) => {
    submit(submittedData);
  };




return (
  
  <form>
    <div className='max-w-[700px] mx-auto my-16 p-4'>
    <h1>Customer Info</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer Name</label>
  <input type="text" {...register("CustomerName")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer Address</label>
  <input type="text" {...register("CustomerAddress")} />
</div>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"></textarea>
  <label for="comment">Customer City</label>
  <input type="text" {...register("CustomerCity")} />
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
<input type="submit" value="Submit" />
</div>
</form>
   
    
    
  );
  
};

export default OrderForm;