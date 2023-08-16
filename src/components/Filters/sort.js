import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './sort.css'

export default function SortProducts({ products, updateProducts }) {
  const HandleSort = (type) => {
    let sortedProducts = [...products.current];
    if (type == "1") {
      sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    else if (type == "2") {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    else if (type == "3") {
      sortedProducts.sort((a, b) => b.price - a.price)
    }
    else {
      sortedProducts.sort((a, b) => a.price - b.price)
    }
    updateProducts(sortedProducts)

  }


  return (
    <FormControl className='main-container' >
      <FormLabel id="demo-radio-buttons-group-label">Sort by</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(e) => { HandleSort(e.target.value) }}
      >
        <FormControlLabel value="1" control={<Radio />} label="Old to New" />
        <FormControlLabel value="2" control={<Radio />} label="New to Old" />
        <FormControlLabel value="3" control={<Radio />} label="Price High to Low" />
        <FormControlLabel value="4" control={<Radio />} label="Price Low to High" />
      </RadioGroup>
    </FormControl>
  );
}