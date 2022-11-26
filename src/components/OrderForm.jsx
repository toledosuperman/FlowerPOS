import { UserAuth } from '../context/AuthContext';
import React, {  useState } from "react";
import {  useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { Spinner } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import toast, { Toaster } from 'react-hot-toast';
import "./account.css";
import background from '../assets/FlowerField.jpg'
function OrderForm({  onClose,open}) {
        const [isLoading] = useState(false);
        const { user } = UserAuth();
       
  
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
 
  const tileDisabled = ({  date}) => {
        return date < new Date() 
     }
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
        active: true,
        created: Timestamp.now(),
        user: user
      })
      navigate('/account')
    } catch (err) {
      toast.error(err)
    }}

   


return (<>
        {(user === null) && <NoLoggedInView />}
        {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
        {(user !== null) && <> 
          <React.Fragment>
<div style={{ backgroundImage: `url(${background})`,
  
  backgroundSize:"contain", 
  }}>
  <Navbar />
  <form onSubmit={handleSubmit}className='OrderForm' name='OrderForm'onClose={onClose} open={open}>
    <div className='max-w-[700px] mx-auto my-16 p-4'>

    <h1>Customer Info</h1>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setCustomerName(e.target.value.toUpperCase())} 
          value={CustomerName}></textarea>
  <label htmlFor="comment">Customer Name</label>
 
</div>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerAddress(e.target.value.toUpperCase())} 
          value={CustomerAddress}></textarea>
  <label htmlFor="comment">Customer Address</label>
  
</div>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setCustomerCity(e.target.value.toUpperCase())} 
          value={CustomerCity}></textarea>
  <label htmlFor="comment">Customer City</label>
 
</div>
 <div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerState(e.target.value.toUpperCase())} 
          value={CustomerState}></textarea>
  <label htmlFor="comment">State</label>
  
</div>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerZip(e.target.value.toUpperCase())} 
          value={CustomerZip}></textarea>
  <label htmlFor="comment">Zip</label>
  
</div>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setCustomerEmail(e.target.value.toUpperCase())} 
          value={CustomerEmail} ></textarea>
  <label htmlFor="comment">Email</label>
 
</div>

  
 <PhoneInput defaultCountry="US"
      placeholder="Enter phone number"
      value={CustomerPhone}
      onChange={setCustomerPhone}/>


<h1>Recipient Info</h1>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientName(e.target.value.toUpperCase())} 
          value={RecipientName}></textarea>
  <label htmlFor="comment"> Name</label>
  
</div>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here" onChange={(e) => setRecipientAddress(e.target.value.toUpperCase())} 
          value={RecipientAddress}></textarea>
  <label htmlFor="comment"> Address</label>
 
</div>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientCity(e.target.value.toUpperCase())} 
          value={RecipientCity}></textarea>
  <label htmlFor="comment"> City</label>
  
</div>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientState(e.target.value.toUpperCase())} 
          value={RecipientState}></textarea>
  <label htmlFor="comment">State</label>
  
</div>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setRecipientZip(e.target.value.toUpperCase())} 
          value={RecipientZip}></textarea>
  <label htmlFor="comment">Zip</label>
  
</div>

<PhoneInput defaultCountry="US"
      placeholder="Enter phone number"
      value={RecipientPhone}
      onChange={setRecipientPhone}/>
  

<h1>Product Info</h1>
<div className="form-floating">
  <textarea className="form-control" id="comment" name="text" placeholder="Comment goes here"onChange={(e) => setProduct(e.target.value.toUpperCase())} 
          value={Product}></textarea>
  <label htmlFor="comment"> Product</label>
  
</div>

<div>
<Calendar onChange={setDeliveryDate} value={DeliveryDate} tileDisabled={tileDisabled}/></div>
<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-half p-4 my-2 text-white'>
          Submit
        </button>
</div>
</form>
   <Toaster toastOptions={{
    success: {
      style: {
        background: 'green',
      },
    },
    error: {
      style: {
        background: 'red',
      },
    },
  }}/></div>
</React.Fragment></>}
;</>)
    
  ;
  

}

export default OrderForm;