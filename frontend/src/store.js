import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,productReviewCreateReducer
} from "./reducers/productsReducers";
import { cartReducer } from './reducers/cartReducers';
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/userReducers';
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer} from './reducers/orderReducers';


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  productReviewCreate:productReviewCreateReducer,
  productUpdate:productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateUserProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,  
  orderList: orderListReducer,  
});

//set cart items from local storage
const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
//save user to local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
//load user shipping details to local storage
const shipingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart:{cartItems:cartItemsFromStorage,shippingAddress:shipingAddressFromStorage},
  userLogin:{userInfo:userInfoFromStorage}
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
