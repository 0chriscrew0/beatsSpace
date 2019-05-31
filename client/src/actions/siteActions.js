import axios from "axios";
import { GET_SITE_INFO } from "./types";

import { SITE_ROUTES } from "../utils/misc";

export function getSiteInfo() {
  const result = axios
    .get(`${SITE_ROUTES}/site-info`)
    .then(response => response.data);

  return {
    type: GET_SITE_INFO,
    payload: result
  };
}
