import {
  LOGIN_USER,
  REGISTER_USER,
  AUTHENTICATE_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_DETAILS,
  REMOVE_FROM_CART,
  ON_ORDER_SUCCESS,
  EDIT_PROFILE,
  CLEAR_UPDATE_PROFILE_SUCCESS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload
      };
    case REGISTER_USER:
      return {
        ...state,
        registerSuccess: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        userData: action.payload
      };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };
    case GET_CART_DETAILS:
      return {
        ...state,
        userData: {
          ...state.userData,
          cartDetails: action.payload
        }
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };
    case ON_ORDER_SUCCESS:
      return {
        ...state,
        orderSuccess: action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
          cartDetails: action.payload.cartDetails
        }
      };
    case EDIT_PROFILE:
      return {
        ...state,
        updateProfileSuccess: action.payload
      };
    case CLEAR_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileSuccess: action.payload
      };
    default:
      return state;
  }
}
