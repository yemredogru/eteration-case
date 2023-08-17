import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../../context/cart';
import './Cart.css'
import { Button } from '@mui/material';


function Cart() {
  const Cart = useContext(CartContext);
  const products = Cart.state;
  const initialCart = products;

  const [cartItems, setCartItems] = useState(initialCart);

  useEffect(() => { setCartItems(Cart.state) }, [Cart.state])
  return (
    <div>
      <div className="cart-container">
        {cartItems.map((item) => (
          <div className='col-md-12 cart-first-container' >
            <div className="col-md-6 first-div">
              <p className='name-feature'>{item.name}</p>
              <p>{item.price}</p>
            </div>
            <div className="col-md-6 second-div" style={{justifyContent:'end'}}>
              <button
              id="button-minus"
                className='button-main'
                onClick={() => { Cart.updateQty(item, item.qty - 1) }}
                variant="outlined"
                size="small">
                -
              </button>
              <p className="quantity-info">{item.qty}</p>
              <button
              id='button-plus'
                onClick={() => { Cart.addToCart(item, 1) }}
                className='button-main'
                sx={{width:"25px"}}
                variant="outlined" 
                size="small"
                >
                +
              </button>
              </div>
          </div>
        ))}

      </div>
      <div className="col-md-6">
        <p>Total Price:{Cart.cartTotal} ₺</p>
        <Button
          style={{ maxHeight: '25px' }}
          variant="contained"
          size="large">
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
