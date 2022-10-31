import { useForm } from "react-hook-form";
import React, {  useState } from "react";
import {  useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore';




 function CreateRecipe({  onClose,open}) {
    const navigate = useNavigate();
    const[Name, setProductName]= useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await addDoc(collection(db, 'Products'), {
            Name: Name,
            created: Timestamp.now()
      })
      navigate('/account')
    } catch (err) {
      alert(err)
    }}

  return (
    <form onSubmit={handleSubmit}className='CreateRecipe' name='CreateRecipe'onClose={onClose} open={open}>
    <div className='max-w-[700px] mx-auto my-16 p-4'>
    <h1>Create Recipe</h1>
<div class="form-floating">
  <textarea class="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setProductName(e.target.value.toUpperCase())} 
          value={Name}></textarea>
  <label for="comment">Product Name</label>
 
</div>



<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
        Submit
      </button>

      </div>
</form>

  
);


}
 export default CreateRecipe;