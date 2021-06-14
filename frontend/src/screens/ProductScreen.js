import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { Row, Col, Image, ListGroup,ListGroupItem,Form,FormLabel, Card, Button, FormControl,FormGroup } from "react-bootstrap";
import Rating from "../components/Ratings";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails,createProductReview } from '../actions/productionActions';
import  { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productsConstants"

const ProductScreen = ({ history,match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("")
   const [comment,setComment]= useState()

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading,error,product} = productDetails 

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { success:successProductReview,error:errorProductReview} = productReviewCreate
  
 useEffect(() => {
  if(successProductReview){
    alert("Review Submitted")
    setRating(0)
    setComment("")
    dispatch({ type:PRODUCT_CREATE_REVIEW_RESET })
  }
  dispatch(listProductDetails(match.params.id))

 }, [dispatch, match,successProductReview]);

  const addToCartHandler = () => {
    //redirect to 
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  const submitHandler = (e)=>{
    e.preventDefault()
    //submit reviews
    dispatch(createProductReview(match.params.id,{rating,comment}))
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
              Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"></Message>
      ) : (
      <>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Price:${product.price}</ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormControl
                          as="select"
                          value = {qty}
                          onChange = {(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup varian="flush">
            {product.reviews.map(review =>(
                <ListGroupItem key={review._id}>
                  <strong>
                    {review.name}
                  </strong>
                  <Rating value={review.rating}/>
                  <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                </ListGroupItem>
              ))}
              <ListGroupItem>
                <h2>Write a customer review</h2>
                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
             
                {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating">
                        <FormLabel>Rating</FormLabel>
                        <FormControl as="select" value={rating} onChange={(e) =>setRating(e.target.value)}>
                          <option value="">Select ...</option>
                          <option value="1">1-Poor</option>
                          <option value="2">2-Fair</option>
                          <option value="4">4-Good</option>
                          <option value="5">5-Excellent</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment">
                      <FormLabel>Comment</FormLabel>
                        <FormControl as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)}>
                        </FormControl>
                      </FormGroup>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ): 
                  <Message>Please <Link to="/login">Login</Link>to reviews this product {""}</Message>}
              </ListGroupItem>
          </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
