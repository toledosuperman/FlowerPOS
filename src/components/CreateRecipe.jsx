import { useForm } from "react-hook-form";
import React, {  useEffect,useState } from "react";
import {  useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {onSnapshot, collection, addDoc, Timestamp,} from 'firebase/firestore';
import Select from 'react-select';
import ReactDOM from 'react-dom/client'
import './recipecss.css'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'







 function CreateRecipe({ onClose,open }) {
  useEffect(() =>
      onSnapshot(collection(db, "Products"), (snapshot) => console.log(snapshot.docs)
    ));
    
    
    

    const options = [
      { value: 'rose', label: 'Rose' },
      { value: 'vase', label: 'Vase' },
      { value: 'tulip', label: 'Tulip' },
    ];
  

const {  reset} = useForm();
const[Name, setName]= useState('');
const [selectedOption, setSelectedOption] = useState(null);
const navigate = useNavigate();
const [ingredients, setIngredients] = useState([{ name: "Loading...", id: "initial"}]);
useEffect(
  () =>
    onSnapshot(collection(db, "Ingredients"), (snapshot) =>
      setIngredients(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    ),
  []
);



const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await addDoc(collection(db, 'Products'), {
      Name: Name,
      Countable: true,
      Type: 'Arrangement',
      completed: true,
      created: Timestamp.now()
    })
    navigate('/account')
  } catch (err) {
    alert(err)
  }}

;


return (
  
 <form onSubmit={handleSubmit}className='CreateRecipe' name='CreateRecipe'onClose={onClose} open={open}>
  <div className='max-w-[700px] mx-auto my-16 p-4'>
  <h1>Create New Recipe</h1>
<div class="form-floating">
<textarea class="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setName(e.target.value.toUpperCase())} 
        value={Name}></textarea>
<label for="comment">Product Name</label>

</div>
<div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>


<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
        Submit
      </button>
</div>
</form> 
 

  
);


}
 export default CreateRecipe;