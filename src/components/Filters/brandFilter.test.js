import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxFilters from './CheckboxFilters'; // Update the import path accordingly

describe('CheckboxFilters', () => {
  const mockOptions = 'brand'; // Replace with your actual options
  const mockUpdateBrands = jest.fn();
  const mockProducts = {
    allData: [
      { brand: 'Brand 1' },
      { brand: 'Brand 2' },
      // ... mock products
    ],
  };
  const mockUpdateProducts = jest.fn();

  it('renders checkbox filters and handles search', () => {
    render(
      <CheckboxFilters
        title="Filter By Brand"
        options={mockOptions}
        updateBrands={mockUpdateBrands}
        products={mockProducts}
        updateProducts={mockUpdateProducts}
      />
    );

    // Assertions
    const searchInput = screen.getByLabelText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'Brand 1' } });
    expect(searchInput.value).toBe('Brand 1');

    const checkboxLabels = screen.getAllByRole('checkbox');
    expect(checkboxLabels).toHaveLength(mockProducts.allData.length);

    // Simulate clicking on a checkbox
    fireEvent.click(checkboxLabels[0]);
    expect(mockUpdateBrands).toHaveBeenCalledWith(['Brand 1']);

    // Simulate unchecking the checkbox
    fireEvent.click(checkboxLabels[0]);
    expect(mockUpdateBrands).toHaveBeenCalledWith([]);

    // ... add more assertions as needed
  });

  it('updates products based on selected checkboxes', () => {
    render(
      <CheckboxFilters
        title="Filter By Brand"
        options={mockOptions}
        updateBrands={mockUpdateBrands}
        products={mockProducts}
        updateProducts={mockUpdateProducts}
      />
    );

    // Simulate clicking on a checkbox
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(mockUpdateBrands).toHaveBeenCalledTimes(1);
    expect(mockUpdateProducts).toHaveBeenCalledTimes(1);
  });
});
