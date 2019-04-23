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
    let total = this.formatMilliseconds(audio.duration);
    let position = audio.position / audio.duration;

    this.setState({
      elapsed,
      total,
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
          <img className="img-fluid" alt="" src={images[0].url} />
          <i
            className={`fas ${
              this.state.playing === Sound.status.PLAYING
                ? "fa-pause"
                : "fa-play"
            }`}
            onClick={this.handlePlayClick}
          />
          <i className="fas fa-times" onClick={this.exitPlayer} />
          <h2>{name}</h2>
          <h4>{artist.name}</h4>
          <div className="progress">
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${this.state.position * 100}%` }}
              aria-valuenow={this.state.position * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AudioPlayer);
