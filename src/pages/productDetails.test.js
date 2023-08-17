import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CartContext from '../context/cart';
import ProductDetails from './productDetails'; 

describe('ProductDetails', () => {
  const mockCartItem = {
    addToCart: jest.fn(),
  };

  it('renders product details and adds to cart', () => {
    const mockItem = {
      name: 'Product A',
      price: 20,
      image: 'product-image.jpg',
      description: 'Product description',
    };

    render(
      <CartContext.Provider value={mockCartItem}>
      <MemoryRouter initialEntries={['/details']}>
        <Route path="/details">
          <ProductDetails />
        </Route>
      </MemoryRouter>
    </CartContext.Provider>
    );

 
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockItem.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();

  
    const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
    fireEvent.click(addToCartButton);


    expect(mockCartItem.addToCart).toHaveBeenCalledWith(mockItem, 1);
  });


});
