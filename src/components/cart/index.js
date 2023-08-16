import React, { useContext, useState,useEffect } from 'react';
import CartContext from '../../context/cart';
import './Cart.css'
import { Button } from '@mui/material';


function Cart() {
    const Cart = useContext(CartContext);
    const products = Cart.state;
  const initialCart = products;

  const [cartItems, setCartItems] = useState(initialCart);

  useEffect(()=>{setCartItems(Cart.state)},[Cart.state])
  return (
    <div>
        <div className="cart-container">
      {cartItems.map((item) => (
        <div className='col-md-12' style={{display:'flex',flexDirection:'row'}}>
            <div className="col-md-6">
            <p style={{fontSize:'16px'}}>{item.name}</p>
            <p>{item.price}</p>
            </div>
            <div style={{display:'flex',flexDirection:'row'}} className="col-md-6"><Button style={{height:'25px',width:'25px',minWidth:'25px'}} onClick={()=>{Cart.updateQty(item,item.qty-1)}} variant="contained" size="small">
          -
        </Button><p style={{color:'blue'}}>{item.qty}</p>
        <Button onClick={()=>{Cart.addToCart(item,1)}} style={{height:'25px',width:'25px',minWidth:'25px'}} variant="contained" size="small">
          +
        </Button></div>
        </div>
      ))}
      
    </div>
    <div className="col-md-6">
    <p>Total Price:{Cart.cartTotal}</p>
    <Button style={{maxHeight:'25px'}} variant="contained" size="large">
          Checkout
        </Button>
        </div>
    </div>
  );
}

export default Cart;
