import { useForm } from "react-hook-form";
import React, {  useEffect,useState } from "react";
import { UserAuth } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore';


function CreateRecipe({ values,onClose,open }) {
// initialize react-hook-form
const {  reset} = useForm();
const[ProductName, setProductName]= useState('');
const[ ProductCost,setProductCost ]= useState('');


const navigate = useNavigate();

// populate form fields
useEffect(() => {
  reset(values);
}, [values]);

// call container submit handler to save new/updated values
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await addDoc(collection(db, 'Products'), {
      ProductName: ProductName,
      ProductCost: ProductCost,
      Countable: true,
      Type: 'Arrangement',
      completed: false,
      created: Timestamp.now()
    })
    navigate('/account')
  } catch (err) {
    alert(err)
  }}




return (
  
<form onSubmit={handleSubmit}className='CreateRecipe' name='CreateRecipe'onClose={onClose} open={open}>
  <div className='max-w-[700px] mx-auto my-16 p-4'>
  <h1>Create New Recipe</h1>
<div class="form-floating">
<textarea class="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setProductName(e.target.value.toUpperCase())} 
        value={ProductName}></textarea>
<label for="comment">Product Name</label>

</div>
<div class="form-floating">
<textarea class="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setProductCost(e.target.value.toUpperCase())} 
        value={ProductCost}></textarea>
<label for="comment">Product Cost</label>

</div>


<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
        Submit
      </button>
</div>
</form>
 

  
);


}
export default CreateRecipe;