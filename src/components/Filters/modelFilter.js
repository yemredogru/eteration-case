import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import './model-filter.css'

export default function CheckboxModelFilters({ title, options, updateModels, selectedBrands, products, originalArray, updateProducts }) {
  const [items, setItems] = useState({ filter: [], current: [] });
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    const filters = [];
    products.allData.forEach((item) => {

      if (selectedBrands.length > 0) {
        if (!filters.includes(item[options]) && selectedBrands.includes(item.brand)) {
          filters.push(item[options]);
        }
      }
      else {

        if (!filters.includes(item[options])) {
          filters.push(item[options]);
        }
      }

    });
    setItems((prevItems) => ({
      filter: filters,
      current: filters
    }));
  }, [products.allData, options, selectedBrands]);

  const handleModel = (models) => {
    updateModels(models);
    if (models.length == 0) {

      if (selectedBrands.length == 0) {

        updateProducts(products.allData);
      }
      else {

        const filteredProducts = products.allData.filter((product) =>
          selectedBrands.includes(product.brand))
        updateProducts(filteredProducts);
      }


    } else {

      if (selectedBrands.length == 0) {
        const filteredProducts = products.allData.filter((product) =>
          models.some((model) => product[options].includes(model)))
        updateProducts(filteredProducts);
      }
      else {
        const filteredProducts = products.allData.filter((product) =>
          models.some((model) => product[options].includes(model) && selectedBrands.includes(product.brand)))
        updateProducts(filteredProducts);
      }

    }
  };
  const handleSearch = (search) => {
    var newBrands = items.current.filter(function (el) {
      return el.toLowerCase().indexOf(search.toLowerCase()) > -1;
    })
    setItems((prevItems) => ({
      filter: newBrands,
      current: prevItems.current
    }));
  }
  const handleCheck = (item) => {
    const newChecked = checked.includes(item) ? checked.filter((checkedItem) => checkedItem !== item) : [...checked, item];
    setChecked(newChecked);


    handleModel(newChecked);

  };

  return (
    <List
      className='list-container'
      subheader={<li />}>

      <TextField id="outlined-multiline-flexible" label="Search" onChange={(e) => handleSearch(e.target.value)} maxRows={4} />
      {items.filter.map((item) => (
        <FormControlLabel
          key={item}
          className='form-label'
          control={<Checkbox checked={checked.includes(item)} onChange={() => handleCheck(item)} />}
          label={item}
        />
      ))}
    </List>
  );
}
