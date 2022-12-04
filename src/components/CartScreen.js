import React, { useEffect, useState} from 'react'
import { CartContainerStyle} from '../components/styles/CartScreen'
import { listCartItems } from '../components/cartActions'
import CartItem from './CartItem'
import NoLoggedInView from '../components/NoLoggedInView';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './navbar';
import {  Card, Spinner} from 'react-bootstrap';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';
import toast ,{Toaster} from 'react-hot-toast';
import background from '../assets/FlowerField.jpg'
import { UserAuth } from '../context/AuthContext';
import Footer from './footer';

function CartScreen ({onClose,open})  {
  const [isLoading] = useState(false);
  const { user } = UserAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cartItemsList = useSelector((state) => state.cartItemsList)
  const[Name, setName]= useState('');
  const[Inventory, setInventory]= useState(0);
  const[Price, setPrice]= useState(0);
  const { loading, error, cartItems } = cartItemsList
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Products'), {
        Name: Name,
        Inventory: Number(Inventory),
        Countable: true,
        Type: 'Arrangement',
        Price: Number(Price),
        created: Timestamp.now()
      })
      navigate('/account')
    } catch (err) {
      toast.error(err)
    }}

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await addDoc(collection(db, 'Recipe'), {
        
        
  //       created: Timestamp.now()
  //     })
  //     navigate('/account')
  //   } catch (err) {
  //     toast.error(err)
  //   }}

  useEffect(() => {
    dispatch(listCartItems())
  }, [dispatch])
  
  return (<>
    {(user === null) && <NoLoggedInView />}
   {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
   {(user !== null) && <>
    <React.Fragment>
  
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
        
        <div style={{ backgroundImage: `url(${background})`,
  
  backgroundSize:"contain", 
  }}><Navbar />
          <Card style={{ margin: 24 }}>
                  <Card.Header className="d-flex justify-content-between align-orders-center">
                      <div className="align-orders-center" style={{ marginRight: 8 }}>
                            <h4 style={{ marginTop: 8, }}>Finalize Recipe</h4>
                          
                      </div>
                  </Card.Header>
                  </Card>
                 
                  
          <CartContainerStyle>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </CartContainerStyle>
          
          <form onSubmit={handleSubmit}className='CreateRecipe' name='CreateRecipe'onClose={onClose} open={open}>
          <div className='max-w-[700px] mx-auto my-16 p-4'>
         
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setName(e.target.value)} 
        value={Name}></textarea>
<label htmlFor="comment">Product Name</label>

</div>
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="number" placeholder="Comment goes here" onChange={(e) => setInventory(e.target.value)} 
        value={Inventory}></textarea>
<label htmlFor="comment">Starting Inventory Count</label>
</div>
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="number" placeholder="Comment goes here" onChange={(e) => setPrice(e.target.value)} 
        value={Price}></textarea>
<label htmlFor="comment">Starting Price</label>
</div>

<div style={{ display: "flex", justifycontent: "center", alignitems: "center"}}>
<button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-half p-4 my-2 text-white' style={{justifycontent: "center"}} >
    Submit
  </button></div>
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
  }}/>
  </div>
              </form>
              <Footer />
          </div>
              
              
        </>
      )}
   </> 
   
    </React.Fragment>
    </>}
;</>)
    
  ;
  
}


export default CartScreen