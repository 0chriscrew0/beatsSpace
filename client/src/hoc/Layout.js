import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import AudioPlayer from "../components/Utils/AudioPlayer";

class Layout extends Component {
  render() {
    return (
      <div className="flex-wrapper">
        <div>
          <Header />
          <div
            className={window.location.pathname !== "/" ? "main-content" : null}
          >
            {this.props.children}
          </div>
        </div>
        {this.props.player.currentTrack ? (
          <AudioPlayer
            className="audio-player"
            streamUrl={this.props.player.currentTrack.audio.url}
            trackTitle={this.props.player.currentTrack.name}
            preloadType="metadata"
            track={this.props.player.currentTrack}
          />
        ) : null}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

export default connect(mapStateToProps)(Layout);
