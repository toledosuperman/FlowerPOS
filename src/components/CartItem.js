import React  from 'react'
import { CartItemStyle, CartInfoStyle } from './styles/CartScreen'
import { useDispatch } from 'react-redux'
import { deleteItemFromCart, updateCartQty } from '../components/cartActions'
import { FaRegTrashAlt } from 'react-icons/fa';
import { Button} from 'react-bootstrap';
const CartItem = ({ item }) => {
  const [stateQty, setStateQty] = React.useState(item.qtyInCart)
  const dispatch = useDispatch()
  
  const handleCartDelete = (cartItemId) => {
    dispatch(deleteItemFromCart(cartItemId))
  }

  const handleCartQty = (itemId, qty) => {
    dispatch(updateCartQty(itemId, qty))
  }
  const handlesubtotal = (price, qty) => {
    dispatch(price*qty)
  }
 
  return (
    <>
      <CartItemStyle>
        <img style={{ maxWidth: '75px', maxHeight: '100px' }} src={item.image} alt={item.title} />
        <CartInfoStyle>
          <h3>Title</h3>
          <h4>{item.title}</h4>
        </CartInfoStyle>

        <CartInfoStyle>
          <h3>Price</h3>
          <h4>
            {' '}
            <span style={{ fontWeight: 600, marginRight: '2px' }}>$</span>
           {item.price}
          </h4>
        </CartInfoStyle>

        <CartInfoStyle>
          <h3>Qty In Cart</h3>
          <input
            type="number"
            min="1"
            value={stateQty}
            onChange={(e) => {
              setStateQty((prev) => Number(e.target.value))
              console.log(stateQty)
              handleCartQty(item.id, stateQty)
            }}
          />
        </CartInfoStyle>
        <CartInfoStyle>
          <h3>Subtotal</h3>
          <h4>
          {' '}
            <span style={{ fontWeight: 600, marginRight: '2px' }}>$</span>
          <input
            type="number"
            min="1"
            value={stateQty*item.price}
            onChange={(e) => {
              handlesubtotal(item.price, stateQty)
            }}
           
          />
          </h4>
        </CartInfoStyle>
        <Button onClick={() => handleCartDelete(item.id)}variant='danger'>
        {<FaRegTrashAlt />}
        </Button>
      </CartItemStyle>
    </>
  )
}

export default CartItem