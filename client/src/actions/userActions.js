import axios from "axios";

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  AUTHENTICATE_USER,
  ADD_TO_CART,
  GET_CART_DETAILS
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
      console.log(response);
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
      console.log(response);
      return response.data;
    });

  return {
    type: GET_CART_DETAILS,
    payload: request
  };
}
