import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './product-list'; // Update the import path accordingly

describe('ProductList', () => {
  // Mocked context and API response
  const mockCartValue = {
    addToCart: jest.fn(),
  };
  const mockSearchValue = {
    state: 'search query', // Replace with your actual search query
  };
  const mockGetProducts = jest.fn().mockResolvedValue({ data: [] }); // Replace with mock data
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

    // Check if loading message appears
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Ensure that getProducts is called
    expect(mockGetProducts).toHaveBeenCalledTimes(1);

    // Simulate API response
    const mockResponseData = [
      { name: 'Product 1', brand: 'Brand A', model: 'Model X' },
      { name: 'Product 2', brand: 'Brand B', model: 'Model Y' },
    ];
    mockGetProducts.mockResolvedValueOnce({ data: mockResponseData });

    // Wait for products to load
    const products = await screen.findAllByTestId('product-card');
    expect(products).toHaveLength(mockResponseData.length);

    // ... add more assertions as needed
  });

  // You can add more test cases for other interactions and functionality
});
