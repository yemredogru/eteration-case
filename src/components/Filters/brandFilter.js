import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import './model-filter.css'


export default function CheckboxFilters({ title, options, updateBrands, products, updateProducts }) {
  const [items, setItems] = useState({ filter: [], current: [] })
  const [checked, setChecked] = useState([])

  useEffect(() => {
    const filters = []
    products.allData.map((item, index) => {
      if (!filters.includes(item[options])) {
        filters.push(item[options])
      }
    })
    setItems((prevItems) => ({
      filter: filters,
      current: filters
    }));
  }, [products.allData])

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
    updateBrands(newChecked)
    if (newChecked.length === 0) {
      updateProducts(products.allData);
    } else {
      const filteredProducts = products.allData.filter((product) =>
        newChecked.some((checkedItem) => product[options].includes(checkedItem))
      );
      updateProducts(filteredProducts);
    }
  };
  return (

    <List
      className='list-container'
      subheader={<li />}
    >
      <TextField
        id="outlined-multiline-flexible"
        label="Search"
        onChange={(e) => handleSearch(e.target.value)}
        maxRows={4}
      />

      {items.filter.map((item, index) => (
        <FormControlLabel key={index} className='form-label' checked={checked.includes(item)} onChange={() => handleCheck(item)} control={<Checkbox />} label={item} />
      ))}


    </List>
  );
}
