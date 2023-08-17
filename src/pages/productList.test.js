import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './productList'; 

describe('ProductList', () => {
  const mockCartValue = {
    addToCart: jest.fn(),
  };
  const mockSearchValue = {
    state: 'search query', 
  };
  const mockGetProducts = jest.fn().mockResolvedValue({ data: [] });
  const mockApi = { getProducts: mockGetProducts };

  // Mock React Context
  jest.mock('../context/cart', () => ({
    __esModule: true,
    default: {
      Consumer: ({ children }) => children(mockCartValue),
    },
  }));
  jest.mock('../context/search', () => ({
    __esModule: true,
    default: {
      Consumer: ({ children }) => children(mockSearchValue),
    },
  }));
  jest.mock('../services/productService', () => ({
    __esModule: true,
    default: mockApi,
  }));

  it('renders products and filters', async () => {
    render(<ProductList />);

  
    expect(screen.getByText('Loading...')).toBeInTheDocument();


    expect(mockGetProducts).toHaveBeenCalledTimes(1);

   
    const mockResponseData = [
      { name: 'Product 1', brand: 'Brand A', model: 'Model X' },
      { name: 'Product 2', brand: 'Brand B', model: 'Model Y' },
    ];
    mockGetProducts.mockResolvedValueOnce({ data: mockResponseData });

   
    const products = await screen.findAllByTestId('product-card');
    expect(products).toHaveLength(mockResponseData.length);


  });


});
