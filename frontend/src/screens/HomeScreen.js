import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col } from "react-bootstrap"
import {listProducts} from '../actions/productionActions';
import Product from "../components/Product"
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Last } from "react-bootstrap/esm/PageItem";
//definde dispatch 
const HomeScreen = () => {
  const dispatch = useDispatch();
//bring in products from the store 
  const productList = useSelector(state => state.productList)
  //pull loading, error and products from the state
  const {loading, error,products } = productList
  useEffect(() => {
   //use dispatch to get the products instead of axios
    dispatch(listProducts())
  }, [dispatch])
  
  return (
    <>
      <h1>Latest Products</h1>
      
      {loading ? (<Loader />) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
         <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row> 
      )}
      
    </>
  );
};

export default HomeScreen;
