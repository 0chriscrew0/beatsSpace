import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DefaultImage from "../../resources/img/featured-image-01.jpg";

import { setCurrentTrack } from "../../actions/playerActions";
import AudioLoading from "./AudioLoading";

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
              class="btn btn-info"
              data-toggle="modal"
              data-target={`#${modalId}`}
            >
              Details
            </button>
            <div
              class="modal fade"
              id={modalId}
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      {name}
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p className="text-muted">Created by {artist.name}</p>
                    <div>{description}</div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-warning mr-auto"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <h6 className="my-0 mr-2">${price}</h6>
                    <button type="button" class="btn btn-primary">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
