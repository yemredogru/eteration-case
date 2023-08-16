import React,{useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Col} from 'reactstrap';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Row } from 'reactstrap';
import CartContext from '../../context/cart';
import SearchContext from '../../context/search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container } from '@mui/material';


export default function MenuAppBar({ title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const search = useContext(SearchContext)
  const cart = useContext(CartContext)
  
 
  const handleSearch = (event) => {
    search.changeSearch(event)
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className="header" style={{backgroundColor:"#2A59FE",color:'white'}}>
    <Container>
      <Row style={{display:"flex",alignItems:'center'}}>
        <Col md="2"><Box sx={{ flex: 1, display: 'flex' }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to={"/"}  style={{color:"black",textDecoration:"none",color:"white"}}>Eteration</Link>
      </Typography>
    </Box></Col>
        <Col md="8"><Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
    <TextField onChange={(e)=>{handleSearch(e.target.value)}} style={{backgroundColor:"white"}} id="outlined-basic" label="Search" variant="outlined" />
    </Box></Col>
        <Col md="2"> <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <div >
      
        <ShoppingCartIcon className="cart-icon" />
        <p className="cart-total">{cart.cartTotal} ₺</p>
     
    </div>
       
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

        </div>
      
    </Box></Col>
      </Row>
    </Container>
  </div>
  );
}

{/* <Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Col md="3">
    <Box sx={{ flex: 1, display: 'flex' }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to={"/"}  style={{color:"black",textDecoration:"none",color:"white"}}>Eteration</Link>
      </Typography>
    </Box></Col>
    <Col md="2">
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
    <TextField onChange={(e)=>{handleSearch(e.target.value)}} style={{backgroundColor:"white"}} id="outlined-basic" label="Search" variant="outlined" />
    </Box></Col>
    <Col md="4">
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
    <ShoppingCartIcon style={{alignSelf:'center'}} />
        <p>{cart.cartTotal} ₺</p>
       
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

        </div>
      
    </Box></Col>
  </Toolbar>
</AppBar>
</Box> */}