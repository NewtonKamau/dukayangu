import { useState,useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from "axios";
import Product from "./ProductScreen"
import products from '../products'
const HomeScreen = () => {
  const [ products, setProducts] = useState([]);
  useEffect(() => {
    //fetch data from the api using axios in asychronous manner
    const fetchProducts = async () => {
      const { data } = axios.get("/api/product/");
      //set our products to show other than an empty array[]
      setProducts(data);
    }
    fetchProducts()
  },[])
    return (
      <>
        <h1>Latest Products</h1>
            <Row>
                { products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3}>
               <Product product={product} />
            </Col>
                
                ))}</Row>
      </>
    );
}

export default HomeScreen
