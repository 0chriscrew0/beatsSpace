import {
  SET_CURRENT_TRACK,
  CLEAR_CURRENT_TRACK,
  SET_PLAY_STATUS
} from "./types";

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

export function setPlayStatus(playing) {
  return {
    type: SET_PLAY_STATUS,
    payload: playing
  };
}
