import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CartContext from '../context/cart';
import ProductDetails from './ProductDetails'; // Update the import path accordingly

describe('ProductDetails', () => {
  // Mocked context
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
      <MemoryRouter initialEntries={['/details']}>
        <Route path="/details">
          <CartContext.Provider value={mockCartItem}>
            <ProductDetails />
          </CartContext.Provider>
        </Route>
      </MemoryRouter>,
      { wrapper: MemoryRouter }
    );

    // Verify that product details are rendered
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockItem.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();

    // Simulate clicking the "Add to Cart" button
    const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
    fireEvent.click(addToCartButton);

    // Verify that addToCart function is called with the correct arguments
    expect(mockCartItem.addToCart).toHaveBeenCalledWith(mockItem, 1);
  });

  // You can add more test cases for different scenarios
});
