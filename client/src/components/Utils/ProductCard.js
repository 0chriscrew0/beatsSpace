import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import DefaultImage from "../../resources/img/featured-image-01.jpg";

import { setCurrentTrack } from "../../actions/playerActions";
import AudioLoading from "./AudioLoading";
import { addProductToCart } from "../../actions/userActions";

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

  addToCart = () => {
    this.props.user.userData.isAuth
      ? this.props.dispatch(addProductToCart(this.props._id))
      : this.props.history.push("/login");
  };

  render() {
    const { _id, images, name, description, price, artist, audio } = this.props;

    const modalId = name.replace(/\s+/g, "");

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
            {this.state.playing ? (
              <AudioLoading
                noAnimation={this.props.player.playing === "PAUSED"}
              />
            ) : (
              <i className="product-card-icon fas fa-play" />
            )}
          </div>
        </div>

        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="product-title">
            <div>{name}</div>
            <div>{`$${price}`}</div>
          </h5>

          <div className="product-card-buttons">
            <button
              type="button"
              className="btn btn-info"
              data-toggle="modal"
              data-target={`#${modalId}`}
            >
              Details
            </button>
            <div
              className="modal fade"
              id={modalId}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      {name}
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p className="text-muted">Created by {artist.name}</p>
                    <div>{description}</div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-warning mr-auto"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <h6 className="my-0 mr-2">${price}</h6>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.addToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-default" onClick={this.addToCart}>
              <i className="fas fa-cart-plus" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    user: state.user
  };
};

export default connect(mapStateToProps)(withRouter(ProductCard));
