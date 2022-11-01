import React,{useState, useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {where,query,collection, addDoc, Timestamp,getDocs} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import Select from 'react-select';

 function CreateRecipe({  onClose,open}) {
    
        const auth = getAuth();
        const [read01, setRead01] = useState([]);
        const [selectedValue, setSelectedName] = useState([]);
      
        const retrieve = async () => {
          try {
            const q = query(collection(db, "Products"));
             const qq = query(q, where("Type", "==", "Fresh"));
            const querySnapshot = await getDocs(qq);
      
            setRead01(querySnapshot.docs.map((doc) => doc.data().schedule));
           
          } catch (e) {
            alert(e);
          }
        };
      
        // handles dropdown onChange event.
        const handleChange = (e) => {
          setSelectedName(Array.isArray(e) ? e.map(x => x.Name) : []);
        }
      
      
        useEffect(() => {
          retrieve();
        }, []);
      
        const options = read01.map((Name) => ({ Name: Name }));
        
        const [products, setProducts] = useState([])
        useEffect(()=>{
        getProducts()
      },[])
        useEffect(()=> {
            console.log(products)
        },[products]
        )
        function getProducts(){
            const productCollectionRef = collection(db,'Products')
            getDocs(productCollectionRef)
                .then(response =>{
                    const prod = response.docs.map(doc => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                    setProducts(prod)
                })
                .catch(error => console.log(error.message))
        };
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
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setProductName(e.target.value.toUpperCase())} 
          value={Name}></textarea>
  <label htmlFor="comment">Product Name</label>
  <Select
        isMulti
        value={products.filter((prod) => selectedValue.includes(prod.value))} // Sets selected value
        options={products}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Option"
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