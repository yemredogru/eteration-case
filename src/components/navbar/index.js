import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Col } from 'reactstrap';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Row } from 'reactstrap';
import CartContext from '../../context/cart';
import SearchContext from '../../context/search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Container } from '@mui/material';
import './index.css'

export default function MenuAppBar({ title }) {
  const search = useContext(SearchContext)
  const cart = useContext(CartContext)


  const handleSearch = (event) => {
    search.changeSearch(event)
  };


  return (
    <div className="header" >
      <Container>
        <Row className='main-row'>
          <Col md="2">
            <Box className="first-box">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to={"/"} className='title'>Eteration</Link>
            </Typography>
          </Box>
          </Col>
          <Col md="8">
            <Box className="second-box">
            <TextField 
            onChange={(e) => { handleSearch(e.target.value) }} 
            className='bg-color-white'
            id="outlined-basic" 
            label="Search" 
            variant="outlined" />
          </Box>
          </Col>
          <Col md="2"> 
          <Box className="second-box">
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
