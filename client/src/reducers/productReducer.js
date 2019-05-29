import {
  GET_PRODUCTS_SHOP,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SALES,
  GET_PRODUCTS,
  EDIT_PRODUCT,
  REMOVE_PRODUCT,
  GET_ARTISTS,
  ADD_ARTIST,
  REMOVE_ARTIST,
  GET_GENRES,
  ADD_GENRE,
  REMOVE_GENRE,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAILS,
  CLEAR_PRODUCT_DETAILS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_SHOP:
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
    case GET_PRODUCTS:
      return {
        ...state,
        manageProducts: action.payload
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        manageProducts: action.payload.products
      };
    case ADD_ARTIST:
      return {
        ...state,
        artists: action.payload.artists
      };
    case REMOVE_ARTIST:
      return {
        ...state,
        artists: action.payload.artists
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    case ADD_GENRE:
      return {
        ...state,
        genres: action.payload.genres
      };
    case REMOVE_GENRE:
      return {
        ...state,
        genres: action.payload.genres
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
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload
      };
    case CLEAR_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload
      };
    default:
      return state;
  }
}
