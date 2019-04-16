import React from "react";
import { Media, Player, controls } from "react-media-player";
const { PlayPause, MuteUnmute } = controls;

const AudioPlayer = ({ audio }) => {
  return (
    <div className="audio-player">
      <Media>
        <div className="media">
          <div className="media-player">
            <Player src={audio.url} />
          </div>
          <div className="media-controls">
            <PlayPause />
            <MuteUnmute />
          </div>
        </div>
      </Media>
    </div>
  );
};

export default AudioPlayer;
