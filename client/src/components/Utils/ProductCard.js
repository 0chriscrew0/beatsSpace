import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sound from "react-sound";

import DefaultImage from "../../resources/img/featured-image-01.jpg";

class ProductCard extends Component {
  state = {
    playing: Sound.status.PAUSED
  };

  handleIconClick = () => {
    this.setState({
      playing:
        this.state.playing === Sound.status.PAUSED
          ? Sound.status.PLAYING
          : Sound.status.PAUSED
    });
  };

  render() {
    const { _id, audio, images, name, price } = this.props;
    const isPlaying = this.state.playing === Sound.status.PLAYING;

    return (
      <div className="card product-card bg-white border-0`">
        <div className="card-img-wrapper">
          <img
            className="card-img-top img-fluid product-card-img"
            src={images ? images[0].url : DefaultImage}
            alt="beat"
          />
          <div className="overlay" onClick={this.handleIconClick}>
            <i
              className={`product-card-icon ${
                isPlaying ? "fas fa-pause" : "fas fa-play"
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

          <div>
            {console.log(audio)}
            <Sound url={audio.url} playStatus={this.state.playing} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
