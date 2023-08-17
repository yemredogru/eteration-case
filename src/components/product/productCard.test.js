import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './productCard';
import CartContext from '../../context/cart'; 
import { MemoryRouter } from 'react-router-dom';

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
 <MemoryRouter>
        <ProductCard
          products={mockProducts}
          setItem={mockSetItem}
        />
        </MemoryRouter>

      </CartContext.Provider>
    );

   
    const productCards = screen.getAllByRole('img');
    expect(productCards).toHaveLength(mockProducts.current.length);
    mockProducts.current.forEach((product) => {
      const productNameElement = screen.getByText(product.name);
      expect(productNameElement).toBeInTheDocument();
    });
   
    
  });
});
