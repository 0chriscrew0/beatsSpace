import {
  SET_CURRENT_TRACK,
  CLEAR_CURRENT_TRACK,
  SET_PLAY_STATUS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
        playing: "PLAYING"
      };
    case CLEAR_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
        playing: "PAUSED"
      };
    case SET_PLAY_STATUS:
      return {
        ...state,
        playing: action.payload
      };
    default:
      return state;
  }
}
