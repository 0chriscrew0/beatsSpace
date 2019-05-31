import axios from "axios";

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  AUTHENTICATE_USER,
  ADD_TO_CART,
  GET_CART_DETAILS,
  REMOVE_FROM_CART,
  ON_ORDER_SUCCESS,
  EDIT_PROFILE,
  CLEAR_UPDATE_PROFILE_SUCCESS
} from "./types";
import { USER_ROUTES } from "../utils/misc";

export function loginUser(data) {
  const request = axios
    .post(`${USER_ROUTES}/login`, data)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function registerUser(data) {
  const request = axios
    .post(`${USER_ROUTES}/register`, data)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_ROUTES}/logout`)
    .then(request => request.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}

export function authenticateUser() {
  const request = axios
    .get(`${USER_ROUTES}/auth`)
    .then(response => response.data);

  return {
    type: AUTHENTICATE_USER,
    payload: request
  };
}

export function addProductToCart(productId) {
  const request = axios
    .post(`${USER_ROUTES}/addToCart`, { productId })
    .then(response => {
      return response.data;
    });

  return {
    type: ADD_TO_CART,
    payload: request
  };
}

export function getCartDetails(ids) {
  const request = axios
    .post(`${USER_ROUTES}/getCartDetails`, ids)
    .then(response => {
      return response.data;
    });

  return {
    type: GET_CART_DETAILS,
    payload: request
  };
}

export function removeFromCart(id) {
  console.log(id);
  const request = axios
    .post(`${USER_ROUTES}/removeFromCart`, { id })
    .then(response => response.data);

  return {
    type: REMOVE_FROM_CART,
    payload: request
  };
}

export function onOrderSuccess(data) {
  const request = axios
    .post(`${USER_ROUTES}/order-success`, data)
    .then(response => response.data);

  return {
    type: ON_ORDER_SUCCESS,
    payload: request
  };
}

export function editProfile(data) {
  const request = axios
    .post(`${USER_ROUTES}/update-profile`, data)
    .then(response => response.data);

  return {
    type: EDIT_PROFILE,
    payload: request
  };
}

export function clearUpdateProfileSuccess() {
  return {
    type: CLEAR_UPDATE_PROFILE_SUCCESS,
    payload: {}
  };
}
