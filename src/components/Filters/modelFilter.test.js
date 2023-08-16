import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxModelFilters from './CheckboxModelFilters'; // Update the import path accordingly

describe('CheckboxModelFilters', () => {
  const mockOptions = 'model'; // Replace with your actual options
  const mockUpdateModels = jest.fn();
  const mockSelectedBrands = ['Brand 1'];
  const mockProducts = {
    allData: [
      { brand: 'Brand 1', model: 'Model A' },
      { brand: 'Brand 2', model: 'Model B' },
      // ... mock products
    ],
  };
  const mockOriginalArray = [...mockProducts.allData];
  const mockUpdateProducts = jest.fn();

  it('renders checkbox filters and handles search', () => {
    render(
      <CheckboxModelFilters
        title="Filter By Model"
        options={mockOptions}
        updateModels={mockUpdateModels}
        selectedBrands={mockSelectedBrands}
        products={mockProducts}
        originalArray={mockOriginalArray}
        updateProducts={mockUpdateProducts}
      />
    );

    // Assertions
    const searchInput = screen.getByLabelText(/Search/i);
    fireEvent.change(searchInput, { target: { value: 'Model A' } });
    expect(searchInput.value).toBe('Model A');

    const checkboxLabels = screen.getAllByRole('checkbox');
    expect(checkboxLabels).toHaveLength(2); // Number of models in mockProducts

    // Simulate clicking on a checkbox
    fireEvent.click(checkboxLabels[0]);
    expect(mockUpdateModels).toHaveBeenCalledWith(['Model A']);

    // Simulate unchecking the checkbox
    fireEvent.click(checkboxLabels[0]);
    expect(mockUpdateModels).toHaveBeenCalledWith([]);

    // ... add more assertions as needed
  });

  it('updates products based on selected checkboxes and selected brands', () => {
    render(
      <CheckboxModelFilters
        title="Filter By Model"
        options={mockOptions}
        updateModels={mockUpdateModels}
        selectedBrands={mockSelectedBrands}
        products={mockProducts}
        originalArray={mockOriginalArray}
        updateProducts={mockUpdateProducts}
      />
    );

    // Simulate clicking on a checkbox
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(mockUpdateModels).toHaveBeenCalledTimes(1);
    expect(mockUpdateProducts).toHaveBeenCalledTimes(1);
  });
});
