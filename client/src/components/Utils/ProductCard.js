import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DefaultImage from "../../resources/img/featured-image-01.jpg";

import {
  setCurrentTrack,
  clearCurrentTrack
} from "../../actions/playerActions";

class ProductCard extends Component {
  state = {
    playing: false
  };

  handleIconClick = id => {
    this.setState(
      {
        playing: !this.state.playing
      },
      () => {
        if (this.state.playing) {
          this.props.dispatch(setCurrentTrack(id));
        } else {
          this.props.dispatch(clearCurrentTrack());
        }
      }
    );
  };

  render() {
    const { _id, images, name, price } = this.props;

    return (
      <div className="card product-card bg-white border-0`">
        <div className="card-img-wrapper">
          <img
            className="card-img-top img-fluid product-card-img"
            src={images ? images[0].url : DefaultImage}
            alt="beat"
          />
          <div className="overlay" onClick={() => this.handleIconClick(_id)}>
            <i
              className={`product-card-icon ${
                this.state.playing ? "fas fa-square" : "fas fa-play"
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
