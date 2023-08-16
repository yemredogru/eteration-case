import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../../context/cart'; // Import your CartProvider if you have one
import Cart from './Cart'; // Update the import path accordingly

// Mock the CartProvider and its context value
jest.mock('../../context/cart', () => ({
  CartProvider: ({ children }) => <div>{children}</div>,
  useCart: jest.fn(),
}));

describe('Cart', () => {
  it('renders cart items and total price', () => {
    // Mocked context value
    const mockCart = {
      state: [
        { name: 'Product 1', price: 10, qty: 2 },
        { name: 'Product 2', price: 15, qty: 3 },
      ],
      cartTotal: 55,
      addToCart: jest.fn(),
      updateQty: jest.fn(),
    };

    // Mock useCart hook to return the mocked context value
    jest.spyOn(require('../../context/cart'), 'useCart').mockReturnValue(mockCart);

    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    // Assertions
    const productNames = screen.getAllByText(/Product/i);
    expect(productNames).toHaveLength(mockCart.state.length);

    const totalText = screen.getByText(`Total Price:${mockCart.cartTotal} ₺`);
    expect(totalText).toBeInTheDocument();
  });

  it('calls updateQty and addToCart when buttons are clicked', () => {
    const mockUpdateQty = jest.fn();
    const mockAddToCart = jest.fn();

    const mockCart = {
      state: [
        { name: 'Product 1', price: 10, qty: 2 },
        { name: 'Product 2', price: 15, qty: 3 },
      ],
      cartTotal: 55,
      addToCart: mockAddToCart,
      updateQty: mockUpdateQty,
    };

    jest.spyOn(require('../../context/cart'), 'useCart').mockReturnValue(mockCart);

    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    // Simulate clicking the "+" button
    fireEvent.click(screen.getAllByRole('button', { name: '+' })[0]);
    expect(mockAddToCart).toHaveBeenCalledWith(mockCart.state[0], 1);

    // Simulate clicking the "-" button
    fireEvent.click(screen.getAllByRole('button', { name: '-' })[0]);
    expect(mockUpdateQty).toHaveBeenCalledWith(mockCart.state[0], 1);
  });
});
