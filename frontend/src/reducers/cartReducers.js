import { CART_ADD_ITEM,CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            //check it the item already exists in the cart using item id
            const itemExists = state.cartItems.find(x => x.product === item.product)
            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === itemExists.product ? item : x )
                }
            } else {
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            
            return {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)
                }
        default:
            return state
    }
}