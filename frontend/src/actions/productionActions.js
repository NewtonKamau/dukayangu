import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productsContstants";

export const listProducts = () => async (dispatch) =>{
  try {
    //make request
    dispatch({ type: PRODUCT_LIST_REQUEST })
  //import data using axios
    const { data } = await axios.get("/api/products");
    //disptach products
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload:data
    })
} catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:error.response && error.response.data.message ? error.response.data.message : error.message
  })
}
}
