import React,{useState,useEffect} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import ListSubheader from '@mui/material/ListSubheader';


export default function CheckboxFilters({title,options,updateBrands,products,updateProducts}) {
 const [items,setItems] = useState({ filter: [], current: [] })
 const [checked,setChecked]= useState([])

 useEffect(()=>{
  const filters=[]
  products.allData.map((item,index)=>{
      if(!filters.includes(item[options])){
        filters.push(item[options])
      }
    })
    setItems((prevItems) => ({
      filter: filters,
      current: filters
    }));
 },[ products.allData])

 const handleSearch=(search)=>{
    var newBrands = items.current.filter(function (el) {
      return el.toLowerCase().indexOf(search.toLowerCase()) > -1;
    })
    setItems((prevItems) => ({
      filter: newBrands,
      current:prevItems.current
    }));
 }
 const handleCheck = (item) => {
  const newChecked = checked.includes(item) ? checked.filter((checkedItem) => checkedItem !== item) : [...checked, item];
  setChecked(newChecked);
updateBrands(newChecked)
  if (newChecked.length === 0) {
    updateProducts(products.allData);
  } else {
    const filteredProducts =  products.allData.filter((product) =>
      newChecked.some((checkedItem) => product[options].includes(checkedItem))
    );
    updateProducts(filteredProducts);
  }
};
  return (
    
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 170,
        marginBottom:'20px',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
       <TextField
          id="outlined-multiline-flexible"
          label="Search"
          onChange={(e)=>handleSearch(e.target.value)}
          maxRows={4}
        />

            {items.filter.map((item,index) => (
              <FormControlLabel key={index} style={{width:"80%",fontSize:"12px",paddingLeft:"5px"}}  checked={checked.includes(item)} onChange={() => handleCheck(item)}   control={<Checkbox />} label={item} />
            ))}

     
    </List>
  );
}
