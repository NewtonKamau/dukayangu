import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

  //set dispatch
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  //distructure the user login details
  const { loading, error, userInfo } = userRegister;
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
      //check if passwords matches confirm password
      if (password !== confirmPassword) {
          setMessage("Passwords do not match");
      } else {
          
      
          //get the name,email and password from the form
          dispatch(register(name, email, password))
      }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <FormControl
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </Form.Group>
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>

        <Row className="py-3">
          <Col>
            Have an account?
            <Link
              to={redirect ? `/login ?redirect/${redirect}` : "/login"}
            >
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
