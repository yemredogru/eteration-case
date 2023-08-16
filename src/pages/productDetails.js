import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import CartContext from "../context/cart";
import Cart from "../components/cart";
import { useLocation } from 'react-router-dom';
import { Button } from "@mui/material";
import './product-details.css'; // Yolunuza göre düzenleyin

function ProductDetails() {
    let location = useLocation();
    const cart = useContext(CartContext)
    const setItem = (product) => {
        cart.addToCart(product, 1)
    }
    const item = location.state.item;

    return (
        <Container>
            <Row>
                <Col xs="12" md="10" style={{ marginTop: "50px" }}>
                    <ProductCard item={item} setItem={setItem} />
                </Col>
                <Col xs="12" md="2">
                    <Cart />
                </Col>
            </Row>
        </Container>
    );
}

function ProductCard({ item, setItem }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={item.image}
                    alt={item.name}
                />
            </div>
            <div className="product-details">
                <div className="product-details-content">
                    <div className="product-title">{item.name}</div>
                    <div className="product-price">{item.price}</div>
                    <div className="add-to-cart-button">
                        <Button
                            className="add-to-cart-button"
                            onClick={() => {
                                setItem(item);
                            }}
                            variant="contained"
                            size="large"
                        >
                            Add to Cart
                        </Button>
                    </div>
                    <div className="product-description">{item.description}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
