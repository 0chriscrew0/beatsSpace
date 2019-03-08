import React, { Component } from "react";
import { Link } from "react-router-dom";

import HeroImage from "../../resources/img/hero-image.jpg";

class Hero extends Component {
  render() {
    return (
      <section className="hero-section bg-primary">
        <div className="container d-flex h-100">
          <div className="row px-3 align-self-center align-items-center">
            <div className="col-sm-6 hero-image-wrapper px-2 mb-4">
              <img
                className="hero-image img-fluid"
                src={HeroImage}
                alt="producing music"
              />
            </div>
            <div className="col-sm-6 px-4 hero-text">
              <h4>Header</h4>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <Link to="/" className="btn btn-outline-secondary my-2">
                Go to Store
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
