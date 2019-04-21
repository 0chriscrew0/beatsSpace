import axios from "axios";
import { SET_CURRENT_TRACK, CLEAR_CURRENT_TRACK } from "./types";
import { PRODUCT_ROUTES } from "../utils/misc";

export function setCurrentTrack(id) {
  console.log(id);
  const result = axios.get(`${PRODUCT_ROUTES}/beatById`, id).then(response => {
    console.log(response);
    return response.data;
  });

  return {
    type: SET_CURRENT_TRACK,
    payload: result
  };
}

export function clearCurrentTrack() {
  return {
    type: CLEAR_CURRENT_TRACK,
    payload: null
  };
}
