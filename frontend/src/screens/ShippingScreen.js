import { useState } from "react";
import { Form, Button ,FormControl} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
 
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const [ address,setAddress ] = useState(shippingAddress.address);
  const [ city,setCity]  = useState(shippingAddress.city);
  const [ postalCode,setPostalCode ] = useState(shippingAddress.postalCode);
  const [ country,setCountry ] = useState(shippingAddress.country);
 
  const dispatch = useDispatch()
  
    const submitHandler = (e) => {
        e.preventDefault()
      dispatch(saveShippingAddress({ address, city, postalCode, country }))
      history.push("/payments");
    
    }
  
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter your address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter your city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter your postalCode"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter your country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
