import React,{useContext} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from './index';
import  CartProvider  from '../../context/cart/CartContext';
import CartContext from '../../context/cart';

describe('Cart', () => {
  

  it('renders cart items and total price', () => {
    render(
      <CartProvider >
        <Cart />
      </CartProvider>
    );


    const totalText = screen.getByText(`Total Price:0 ₺`);
    expect(totalText).toBeInTheDocument();
  });

  
});
