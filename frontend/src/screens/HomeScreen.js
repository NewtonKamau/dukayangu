import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col } from "react-bootstrap"
import {listProducts} from '../actions/productionActions';
import Product from "../components/Product"
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import Paginate from '../components/Paginate';
const HomeScreen = ( {match }) => {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

//bring in products from the store 
  const productList = useSelector(state => state.productList)

  //pull loading, error and products from the state
  const {loading, error,products,page,pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber))
  }, [dispatch,keyword,pageNumber])
  
  return (
    <>
      <h1>Latest Products</h1>
      { !keyword && <ProductCarousel /> }
      {loading ? (<Loader />) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
      <>
         <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row> 
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
      </>
      )}
      
    </>
  );
};

export default HomeScreen;
