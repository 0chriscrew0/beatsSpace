import { GET_SITE_INFO, EDIT_SITE_INFO } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SITE_INFO:
      return {
        ...state,
        siteInfo: action.payload.siteInfo[0],
        promotion: action.payload.promotion[0]
      };
    case EDIT_SITE_INFO:
      return {
        ...state,
        siteInfo: action.payload.siteInfo
      };
    default:
      return state;
  }
}
