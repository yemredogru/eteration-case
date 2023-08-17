import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './productCard';
import CartContext from '../../context/cart'; 

describe('ProductCard', () => {
  const mockProducts = {
    current: [
      {
        id: 1,
        name: 'Product A',
        price: 20,
        image: 'product-image.jpg',
      },
    ],
  };

  const mockSetItem = jest.fn();

  it('renders product cards and pagination', () => {
    const mockCart = {
      state: [], 
      addToCart: jest.fn(),
    };

    render(
      <CartContext.Provider value={mockCart}>
        <ProductCard
          products={mockProducts}
          setItem={mockSetItem}
        />
      </CartContext.Provider>
    );

   
    const productCards = screen.getAllByRole('img');
    expect(productCards).toHaveLength(mockProducts.current.length);

   
    const pagination = screen.getByRole('navigation', { name: 'pagination' });
    expect(pagination).toBeInTheDocument();

   
    userEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    expect(mockCart.addToCart).toHaveBeenCalledTimes(1);
    
  });
});
