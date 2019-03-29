import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SALES,
  GET_ARTISTS,
  GET_GENRES,
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        beats: action.payload.beats,
        size: action.payload.size
      };
    case GET_PRODUCTS_BY_ARRIVAL:
      return {
        ...state,
        byArrival: action.payload
      };
    case GET_PRODUCTS_BY_SALES:
      return {
        ...state,
        bySales: action.payload
      };
    case GET_ARTISTS:
      return {
        ...state,
        artists: action.payload
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        addedProduct: action.payload
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        addedProduct: action.payload
      };
    default:
      return state;
  }
}
