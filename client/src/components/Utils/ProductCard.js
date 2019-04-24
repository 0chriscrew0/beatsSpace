import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DefaultImage from "../../resources/img/featured-image-01.jpg";

import { setCurrentTrack } from "../../actions/playerActions";

class ProductCard extends Component {
  state = {
    playing: false
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.player.currentTrack &&
      nextProps.player.currentTrack._id === this.props._id
    ) {
      this.setState({
        playing: true
      });
    }
    if (
      nextProps.player.currentTrack === null ||
      (nextProps.player.currentTrack &&
        nextProps.player.currentTrack._id !== this.props._id)
    ) {
      this.setState({
        playing: false
      });
    }
  }

  handleIconClick = trackData => {
    this.setState(
      {
        playing: true
      },
      () => {
        this.props.dispatch(setCurrentTrack(trackData));
      }
    );
  };

  render() {
    const { _id, images, name, price, artist, audio } = this.props;

    return (
      <div className="card product-card bg-white border-0`">
        <div className="card-img-wrapper">
          <img
            className="card-img-top img-fluid product-card-img"
            src={images ? images[0].url : DefaultImage}
            alt="beat"
          />
          <div
            className="overlay"
            onClick={
              this.state.playing
                ? null
                : () =>
                    this.handleIconClick({ _id, images, name, artist, audio })
            }
          >
            <i
              className={`product-card-icon ${
                this.state.playing ? null : "fas fa-play"
              }`}
            />
          </div>
        </div>

        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="product-title">
            <div>{name}</div>
            <div>{`$${price}`}</div>
          </h5>

          <div className="product-card-buttons">
            <Link className="btn btn-info" to={`/product/${_id}`}>
              Details
            </Link>
            <Link className="btn btn-default" to={`/product/${_id}`}>
              <i className="fas fa-cart-plus" />
            </Link>
          </div>
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

export default connect(mapStateToProps)(ProductCard);
