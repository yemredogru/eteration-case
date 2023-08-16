import React, { useState, useEffect } from "react";
import { createContext } from 'react';
import { toast } from "react-toastify";
import Context from './index'

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem("cartList");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};




const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(getLocalCartItems());
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("InStock");

  useEffect(() => {
    const Total = cartItems.reduce((a, b) => a + parseFloat(b.total), 0);
    setCartTotal(Total);

    localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product To Cart
  const addToCart = (item, quantity) => {
    toast.success("Product Added Successfully !");
    const index = cartItems.findIndex((itm) => itm.id === item.id);

    if (index !== -1) {
      cartItems[index] = {
        ...item,
        qty: quantity+cartItems[index].qty,
        total:(item.price ) * (parseInt(quantity+cartItems[index].qty)),
      };
      setCartItems([...cartItems]);
    } else {
      const product = {
        ...item,
        qty: quantity,
        total: (item.price),
      };
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (item) => {
   var filters={id:item.id}
    toast.error("Product Removed Successfully !"); 

    var out = cartItems.findIndex((itm) => {
      return Object.keys(filters).every(filter => {
          return filters[filter] === itm[filter]
      });
    });
    cartItems.splice(out, 1);
    setCartItems([...cartItems]);
  };

  const minusQty = (item) => {
    const index = cartItems.findIndex((itm) => itm.id === item.id);
    if (index !== -1) {
      cartItems[index] = {
        ...item,
        qty: cartItems[index].qty - 1,
        total:((item.price ) * parseInt(quantity+cartItems[index].qty)),
      };
      setCartItems([...cartItems]);
    } 
    
  };

  const plusQty = (item) => {
    if (item.stock >= quantity) {
      setQuantity(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };

  // Update Product Quantity
  const updateQty = (item, quantity) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm) => itm.id === item.id);
      if (index !== -1) {
        var total=0
        if(item.sale == true){
          total=item.price
        }
        else{
          total=item.price
        }
        cartItems[index] = {
          ...item,
          qty: quantity,
          total: total * quantity,
          
        };
        setCartItems([...cartItems]);
        toast.info("Product Quantity Updated !");
      } else {
        const product = {
          ...item,
          qty: quantity,
          total: (item.price - (item.price ) / 100) * quantity,
        };
        setCartItems([...cartItems, product]);
        toast.success("Product Added Updated !");
      }
    } else {
      removeFromCart(item)
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        updateQty: updateQty,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;