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
          <div className="audio-player-wrapper">
            <AudioPlayer
              className="audio-player-wrapper"
              track={this.props.player.currentTrack}
            />
          </div>
        ) : null}
        <div
          style={
            this.props.player.currentTrack ? { marginBottom: "64px" } : null
          }
        >
          <Footer />
        </div>
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
