import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './productCard.css'
import { Button } from "@mui/material";

export default function ProductCard({ products, setItem, updateProducts }) {
  const [page, setPage] = React.useState(1)
  const [show, setShow] = useState([]);
  const handleChange = (event, value) => {
    setPage(value);
    var filteredData = products.current.slice((value - 1) * 12, value * 12)
    setShow(filteredData)
  };
  useEffect(() => {

    var filteredData = products.current.slice((page - 1) * 12, page * 12)
    setShow(filteredData)
  }, [products.current])

  return (
    <>
      {show.map((item, index) => (
        <MDBCol key={index} md="3" className="mb-4">
          <MDBCard className="text-black">
            <MDBCardImage
              src={item.image}
              position="top"
              alt=""
            />
            <MDBCardBody>
              <div className="text-center mt-1">
                <MDBCardTitle className="h4 text-primary mb-1 pb-3 mdb-card-title">{item.price} ₺</MDBCardTitle>
                <Link to={"/details"}
                  className='hide-underline'
                  state={{ item: item }} >
                  <h6
                    className='item-name'>{item.name}</h6></Link>
              </div>


              <div className="d-flex flex-row">
                <Button className='add-to-cart-button' onClick={() => { setItem(item) }} variant="contained" size="large">
                  Add to Cart
                </Button>

              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ))

      }
      <Stack spacing={2}>

        <Pagination count={parseInt(products.current.length / 12) + 1} page={page} onChange={handleChange} />
      </Stack>
    </>
  );
}


