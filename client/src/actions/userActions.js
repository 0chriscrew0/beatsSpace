import axios from "axios";

import { LOGIN_USER, REGISTER_USER } from "./types";
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
