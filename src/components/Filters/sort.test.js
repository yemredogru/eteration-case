import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortProducts from './sort';

describe('SortProducts', () => {
  const mockProducts = {
    current: [
      { createdAt: '2023-08-01', price: 20 },
      { createdAt: '2023-07-01', price: 15 },
    ],
  };
  const mockUpdateProducts = jest.fn();

  it('sorts products correctly based on selected option', () => {
    render(
      <SortProducts
        products={mockProducts}
        updateProducts={mockUpdateProducts}
      />
    );

    // Simulate selecting "Old to New" option
    fireEvent.click(screen.getByLabelText('Old to New'));
    expect(mockUpdateProducts).toHaveBeenCalledWith(expect.arrayContaining([
      { createdAt: '2023-07-01', price: 15 },
      { createdAt: '2023-08-01', price: 20 },
    ]));

    // Simulate selecting "New to Old" option
    fireEvent.click(screen.getByLabelText('New to Old'));
    expect(mockUpdateProducts).toHaveBeenCalledWith(expect.arrayContaining([
      { createdAt: '2023-08-01', price: 20 },
      { createdAt: '2023-07-01', price: 15 },
    ]));

    // Simulate selecting "Price High to Low" option
    fireEvent.click(screen.getByLabelText('Price High to Low'));
    expect(mockUpdateProducts).toHaveBeenCalledWith(expect.arrayContaining([
      { createdAt: '2023-08-01', price: 20 },
      { createdAt: '2023-07-01', price: 15 },
    ]));

    // Simulate selecting "Price Low to High" option
    fireEvent.click(screen.getByLabelText('Price Low to High'));
    expect(mockUpdateProducts).toHaveBeenCalledWith(expect.arrayContaining([
      { createdAt: '2023-07-01', price: 15 },
      { createdAt: '2023-08-01', price: 20 },
    ]));

    // ... add more assertions as needed
  });
});
