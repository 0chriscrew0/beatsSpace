import React, { Component } from "react";
import { connect } from "react-redux";
import Sound from "react-sound";

import { clearCurrentTrack } from "../../actions/playerActions";

class AudioPlayer extends Component {
  state = {
    playing: Sound.status.PLAYING,
    elapsed: 0,
    duration: 0,
    position: 0
  };

  formatMilliseconds = millis => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  handlePlaying = audio => {
    let elapsed = this.formatMilliseconds(audio.position);
    let duration = this.formatMilliseconds(audio.duration);
    let position = audio.position / audio.duration;

    this.setState({
      elapsed,
      duration,
      position
    });
  };

  handlePlayClick = () => {
    this.setState({
      playing:
        this.state.playing === Sound.status.PLAYING
          ? Sound.status.PAUSED
          : Sound.status.PLAYING
    });
  };

  exitPlayer = () => {
    this.props.dispatch(clearCurrentTrack());
  };

  render() {
    const { name, artist, images, audio } = this.props.track;

    return (
      <div className="audio-player-wrapper">
        <Sound
          url={audio.url}
          playStatus={this.state.playing}
          onPlaying={audio => this.handlePlaying(audio)}
        />

        <div className="audio-player">
          <div
            className="progress"
            style={{ backgroundColor: "$primary", height: "4px" }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${this.state.position * 100}%` }}
              aria-valuenow={this.state.position * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3 px-0">
                <div className="audio-player-image">
                  <img className="img-fluid" alt="beat" src={images[0].url} />
                </div>
              </div>

              <div className="col-6 px-0 d-flex-column justify-items-center">
                <h6 className="mb-0 mt-2 display-6">{name}</h6>
                <p className="my-0">{artist.name}</p>
              </div>
              <div className="col-3 d-flex justify-content-around align-items-center">
                <i
                  className={`audio-player-play fas ${
                    this.state.playing === Sound.status.PLAYING
                      ? "fa-pause"
                      : "fa-play"
                  }`}
                  onClick={this.handlePlayClick}
                />
                <i className="fas fa-times" onClick={this.exitPlayer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AudioPlayer);
