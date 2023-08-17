import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxFilters from './brandFilter';

describe('CheckboxFilters', () => {
  const mockOptions = 'brand';
  const mockUpdateBrands = jest.fn();
  const mockProducts = {
    allData: [
      { brand: 'Brand 1' }
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

    const searchInput = screen.getByLabelText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'Brand 1' } });
    expect(searchInput.value).toBe('Brand 1');

    const checkboxLabels = screen.getAllByRole('checkbox');
    expect(checkboxLabels).toHaveLength(mockProducts.allData.length);


    fireEvent.click(checkboxLabels[0]);
    expect(mockUpdateBrands).toHaveBeenCalledWith(['Brand 1']);


    fireEvent.click(checkboxLabels[0]);
    expect(mockUpdateBrands).toHaveBeenCalledWith([]);

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

    
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(mockUpdateBrands).toHaveBeenCalledTimes(1);
    expect(mockUpdateProducts).toHaveBeenCalledTimes(1);
  });
});
