import axios from "axios";
import { GET_PRODUCTS_BY_SALES, GET_PRODUCTS_BY_ARRIVAL } from "./types";

import { PRODUCT_ROUTES } from "../utils/misc";

export function getProductsBySales() {
  const request = axios
    .get(`${PRODUCT_ROUTES}/beats?sortBy=sold&order=desc&limit=3`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_SALES,
    payload: request
  };
}

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_ROUTES}/beats?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}
