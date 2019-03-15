import axios from "axios";
import {
  GET_PRODUCTS_BY_SALES,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_ARTISTS,
  GET_GENRES
} from "./types";

import { PRODUCT_ROUTES } from "../utils/misc";

// ======================
// PRODUCTS
// ======================

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

// ======================
// CATEGORIES
// ======================

export function getArtists() {
  const request = axios
    .get(`${PRODUCT_ROUTES}/getArtists`)
    .then(response => response.data);

  return {
    type: GET_ARTISTS,
    payload: request
  };
}

export function getGenres() {
  const request = axios
    .get(`${PRODUCT_ROUTES}/getGenres`)
    .then(response => response.data);

  return {
    type: GET_GENRES,
    payload: request
  };
}
