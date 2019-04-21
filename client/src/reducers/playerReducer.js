import { SET_CURRENT_TRACK, CLEAR_CURRENT_TRACK } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload
      };
    case CLEAR_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload
      };
    default:
      return state;
  }
}
