import React, { useEffect, useState } from 'react'
import { ProductContainerStyle, PageHeading } from '../components/styles/ProductScreen'
import ProductItem from '../components/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container , Row, Col} from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import NoLoggedInView from '../components/NoLoggedInView';
import { Spinner } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';
import { listCartItems } from '../components/cartActions'
import {db} from '../firebase'
import {onSnapshot, collection, addDoc, Timestamp,} from 'firebase/firestore';
import { listProducts } from './productActions'
const ProductScreen = (props, open) => {
  const dispatch = useDispatch()
  const[Name, setName]= useState('');
  const[Inventory, setInventory]= useState('');
  const navigate = useNavigate();
  useEffect(() =>
      onSnapshot(collection(db, "Products"), (snapshot) => console.log(snapshot.docs)
    ));
  
  
  const cartItemsList = useSelector((state) => state.cartItemsList)

  const { loading, error} = cartItemsList

  useEffect(() => {
    dispatch(listCartItems())
  }, [dispatch])
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'Products'), {
        Name: Name,
        Inventory: Inventory,
        Countable: true,
        Type: 'Arrangement',
        Price: 0,
        created: Timestamp.now()
      })
      navigate('/account')
    } catch (err) {
      alert(err)
    }}

  const [isLoading] = useState(false);
  const { user } = UserAuth();

  const productsList = useSelector((state) => state.productsList)

  const {  products } = productsList

  
  return (<>
 
    {(user === null) && <NoLoggedInView />}
   {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
   {(user !== null) && <>
    <React.Fragment>
    <Navbar />
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <PageHeading primary>Create Recipe</PageHeading>
          <form onSubmit={handleSubmit}className='CreateRecipe' name='CreateRecipe'onClose={props.onClose} open={open}>
          <div className='max-w-[700px] mx-auto my-16 p-4'>
          <div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setName(e.target.value.toUpperCase())} 
        value={Name}></textarea>
<label htmlFor="comment">Product Name</label>

</div>
<div className="form-floating">
<textarea className="form-control" id="comment" cols="18"name="text" placeholder="Comment goes here" onChange={(e) => setInventory(e.target.value)} 
        value={Inventory}></textarea>
<label htmlFor="comment">Starting Inventory Count</label>
</div></div>
<Container>
      <Row className="justify-content-md-center">
      <Col md="auto">
      <Link to="/cart">
              <Button variant="primary">
                Finalize Recipe
              </Button>
              </Link>
              </Col>
              </Row>
              </Container>
          <ProductContainerStyle primary >
            {products.map((item) => (
              <ProductItem item={item} key={item.id}/>
            ))}
          </ProductContainerStyle>
        
      
      
              </form>
        </>
      )}
   </> 
    </React.Fragment>
    </>}
;</>)
    
  ;
  
}

export default ProductScreen