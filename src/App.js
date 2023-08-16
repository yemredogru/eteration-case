// src/App.js
import React from 'react';
import ProductList from './pages/product-list';
import MenuAppBar from './components/navbar';
import CartContextProvider from './context/cart/CartContext'
import SearchContext from './context/search/searchContext';
import Cart from './components/cart';
import './index.css'
import {Routes,Route} from 'react-router-dom'
import ProductDetails from './pages/product-details';

function HomePage(){
  return(
    <div className='app'>
     <CartContextProvider>
      <SearchContext>
        <MenuAppBar />
      <ProductList />
      </SearchContext>
      
      </CartContextProvider>
    </div>
  )
}
function DetailPage(){
  return(
    <div className='app'>
     <CartContextProvider>
        <MenuAppBar />
      <ProductDetails />
      
      </CartContextProvider>
    </div>
  )
}
function App() {
  return (
    <Routes>
      <Route path="/"  element={<HomePage />}/>
      <Route path="details"  element={<DetailPage />}/>
    </Routes>
  );
}

export default App;
