import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_SALES,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_ARTISTS,
  ADD_ARTIST,
  REMOVE_ARTIST,
  GET_GENRES,
  ADD_GENRE,
  REMOVE_GENRE,
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from "./types";

import { PRODUCT_ROUTES } from "../utils/misc";

// ======================
// PRODUCTS
// ======================

export function getProducts(skip, limit, filters = [], previousState = []) {
  const data = {
    limit,
    skip,
    filters
  };

  const request = axios.post(`${PRODUCT_ROUTES}/shop`, data).then(response => {
    let newState = [...previousState, ...response.data.beats];

    return {
      size: response.data.size,
      beats: newState
    };
  });

  return {
    type: GET_PRODUCTS,
    payload: request
  };
}

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

export function addProduct(formattedData) {
  const request = axios
    .post(`${PRODUCT_ROUTES}/createBeat`, formattedData)
    .then(response => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request
  };
}

export function clearNewProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: {}
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

export function addArtist(newArtist, currentArtists) {
  const request = axios
    .post(`${PRODUCT_ROUTES}/createArtist`, newArtist)
    .then(response => {
      let artists = [...currentArtists, response.data.artist];

      return {
        success: response.data.success,
        artists
      };
    });

  return {
    type: ADD_ARTIST,
    payload: request
  };
}

export function removeArtist(id, currentArtists) {
  console.log(id);
  const request = axios
    .post(`${PRODUCT_ROUTES}/removeArtist`, { id })
    .then(response => {
      let artists = currentArtists.filter(item => {
        return id !== item._id;
      });

      return {
        success: response.data.success,
        artists
      };
    });

  return {
    type: REMOVE_ARTIST,
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

export function addGenre(newGenre, currentGenres) {
  const request = axios
    .post(`${PRODUCT_ROUTES}/createGenre`, newGenre)
    .then(response => {
      let genres = [...currentGenres, response.data.genre];

      return {
        success: response.data.success,
        genres
      };
    });

  return {
    type: ADD_GENRE,
    payload: request
  };
}

export function removeGenre(id, currentGenres) {
  const request = axios
    .post(`${PRODUCT_ROUTES}/removeGenre`, { id })
    .then(response => {
      let genres = currentGenres.filter(item => {
        return id !== item._id;
      });

      return {
        success: response.data.success,
        genres
      };
    });

  return {
    type: REMOVE_GENRE,
    payload: request
  };
}
