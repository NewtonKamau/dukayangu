import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import {Form,Button,Row,Col, FormControl} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';



const LoginScreen = ({location,history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //set dispatch
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  //distructure the user login details
  const { loading, error, userInfo } = userLogin;
  //set redirect if it is not found
  const redirect = location.search ? location.search.split("=")[1] : "/";
  //if the user is logged in dont show redirect

    useEffect(() => {
      if (userInfo) {
        history.push(redirect);
      }
    }, [userInfo, redirect, history]);
  //submit handler to dispactch login
  const submitHandler = (e) => {
    e.preventDefault();
    //get the email and password from the form
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <FormControl
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Customer ?
            <Link
              to={
                redirect
                  ? `/register redirect?redirect/${redirect}`
                  : "/register"
              }
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen
