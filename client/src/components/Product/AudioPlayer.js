import React from "react";

import AudioPlayer from "react-responsive-audio-player";

const AudioPlayerUI = ({ audio, name }) => {
  return (
    <div className="audio-player">
      {/* <Media>
        <div className="media">
          <div className="media-player">
            <Player src={audio.url} />
          </div>
          <div className="media-controls">
            <PlayPause />
            <MuteUnmute />
          </div>
        </div>
      </Media> */}
      <AudioPlayer
        playlist={[{ url: audio.url, title: name }]}
        controls={["playpause", "progress"]}
        cycle={false}
      />
    </div>
  );
};

export default AudioPlayerUI;
