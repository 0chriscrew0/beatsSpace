import { SET_CURRENT_TRACK, CLEAR_CURRENT_TRACK } from "./types";

export function setCurrentTrack(trackData) {
  return {
    type: SET_CURRENT_TRACK,
    payload: { ...trackData }
  };
}

export function clearCurrentTrack() {
  return {
    type: CLEAR_CURRENT_TRACK,
    payload: null
  };
}
