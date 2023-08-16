import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard'; // Update the import path accordingly

// Mock props for testing
const mockProducts = {
  current: [
    // Mock product items here
  ],
};
const mockSetItem = jest.fn();
const mockUpdateProducts = jest.fn();

describe('ProductCard', () => {
  it('renders product cards and pagination', () => {
    render(
      <ProductCard
        products={mockProducts}
        setItem={mockSetItem}
        updateProducts={mockUpdateProducts}
      />
    );

    // You can add assertions here to check if specific elements are rendered correctly
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(mockProducts.current.length);

    // Example: Test clicking on "Add to Cart" button
    userEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    expect(mockSetItem).toHaveBeenCalledTimes(1);
  });
});
