import React, { useState, useEffect } from "react";
import Context from './index'


const CartProvider = (props) => {
  const [search, setSearch] = useState("");



  const setSearchData = (item) => {
    setSearch(item)
  };

  // Update Product Quantity


  return (
    <Context.Provider
      value={{
        ...props,
        state: search,
        changeSearch:setSearchData
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;