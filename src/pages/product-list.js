import React, { useEffect, useState, useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "reactstrap";
import api from "../services/productService";
import { Button } from "@mui/material";

import CartContext from "../context/cart";
import Cart from "../components/cart";
import SortProducts from "../components/Filters/sort";
import CheckboxFilters from "../components/Filters/brand-filter";
import CheckboxModelFilters from "../components/Filters/model-filter";
import ProductCard from "../components/productCard";
import SearchContext from "../context/search";


function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({ show: [], allData: [], current: [] });
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedModels, setSelectedModels] = useState([]);

  const cart = useContext(CartContext)
  const search = useContext(SearchContext)
  useEffect(() => {
    var filter = products.allData.filter(item => item.name.toLowerCase().includes(search.state) || item.model.toLowerCase().includes(search.state) || item.brand.toLowerCase().includes(search.state))
    setProducts((prevItems) => ({
      show: filter,
      allData: prevItems.allData,
      current: filter
    }))
  }, [search.state])

  const getProducts = async () => {
    await api.getProducts()
      .then((response) => {
        setProducts((prevItems) => ({
          show: response.data,
          allData: response.data,
          current: response.data
        }))
        setLoading(false)
      })
  };

  useEffect(() => {
    getProducts()
  }, [])
  const updateProducts = (newProducts) => {
    setProducts((prevItems) => ({
      current: newProducts,
      allData: prevItems.allData,
      show: newProducts
    }));
  };
  const updateShow = (newProducts) => {
    setProducts((prevItems) => ({
      current: prevItems.current,
      allData: prevItems.allData,
      show: newProducts
    }));
  };
  const updateBrands = (brands) => {
    setSelectedBrands(brands);
  };

  const updateModels = (models) => {
    setSelectedModels(models);
  };
  const setItem = (product) => {
    cart.addToCart(product, 1)
  }

  return (
    <Container>
      <Row>
        <Col md="2">
          <SortProducts products={products} updateProducts={updateProducts} />
          <CheckboxFilters title={"Brands"} options={"brand"} products={products} updateBrands={updateBrands} updateProducts={updateProducts} />
          <CheckboxModelFilters title={"Models"} options={"model"} products={products}
            updateModels={updateModels}
            updateProducts={updateProducts}
            selectedBrands={selectedBrands}
          />
        </Col>
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <MDBContainer fluid className="my-5">
              <MDBRow>
                <ProductCard products={products} updateProducts={updateShow} setItem={setItem} />
              </MDBRow>
            </MDBContainer>
          )}
        </Col>
        <Col md="2">
          <Cart />
        </Col>
      </Row>
    </Container>
  );
  
}

export default ProductList;