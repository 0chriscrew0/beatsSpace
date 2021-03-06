import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import AudioPlayer from "../components/Utils/AudioPlayer";

import { getSiteInfo } from "../actions/siteActions";

class Layout extends Component {
  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      this.props.dispatch(getSiteInfo());
    }
  }
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
          className={this.props.player.currentTrack ? "footer-wrapper" : null}
        >
          <Footer data={this.props.site} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    site: state.site
  };
};

export default connect(mapStateToProps)(Layout);
