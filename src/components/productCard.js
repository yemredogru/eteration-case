import React, { useEffect,useState } from 'react';
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
import { Link, Navigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { Button } from "@mui/material";
export default function ProductCard({ products,setItem,updateProducts }) {
  const [page, setPage] = React.useState(1)
  const [show,setShow]=useState([]);
  const handleChange = (event, value) => {
    setPage(value);
    var filteredData = products.current.slice((value-1)*12,value*12)
    setShow(filteredData)
  };
  useEffect(()=>{

    var filteredData = products.current.slice((page-1)*12,page*12)
    setShow(filteredData)
  },[products.current])
  
  return (
    <>
    {show.map((item,index)=>(
      <MDBCol key={index} md="3" className="mb-4">
      <MDBCard className="text-black">
        <MDBCardImage
          src={item.image}
          position="top"
          alt=""
        />
        <MDBCardBody>
          <div className="text-center mt-1">
            <MDBCardTitle style={{display:"flex",justifyContent:"flex-start",fontSize:"14px"}} className="h4 text-primary mb-1 pb-3">{item.price} ₺</MDBCardTitle>
            <Link to={"/details"} state={{item:item}}  style={{color:"black",textDecoration:"none"}}><h6  style={{fontSize:"13px",display:"flex",justifyContent:"flex-start",whiteSpace:"nowrap",textAlign:"center"}}>{item.name}</h6></Link>
          </div>
         

          <div className="d-flex flex-row">
          <Button style={{maxHeight:'25px',fontSize:"12px",width:"100%",whiteSpace:"nowrap",textAlign:"center"}} onClick={()=>{setItem(item)}} variant="contained" size="large">
          Add to Cart
    </Button>
          
          </div>
          
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    ))
    
    }
    <Stack spacing={2}>

<Pagination count={parseInt(products.current.length/12)+1} page={page} onChange={handleChange} />
</Stack>
    </>
  );
}


