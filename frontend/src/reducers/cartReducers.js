import {
  CART_NEW_FAIL,
  CART_NEW_REQUEST,
  CART_NEW_SUCCESS,
  CART_RESET,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: {} }, action) => {
  switch (action.type) {
    case CART_NEW_REQUEST:
      return { ...state, loading: true };
    case CART_NEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        cartItems: action.payload,
      };
    case CART_NEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CART_RESET:
      return {};
    default:
      return state;
  }
};
