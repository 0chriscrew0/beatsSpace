import React, { Component } from "react";
import { Link } from "react-router-dom";

import HeroImage from "../../resources/img/hero-image.jpg";

class Hero extends Component {
  render() {
    return (
      <section className="hero-section bg-primary">
        <div className="container d-flex h-100">
          <div className="row align-self-center align-items-center">
            <div className="col-sm-6 text-center px-2 mb-4">
              <img
                className="hero-image img-fluid"
                src={HeroImage}
                alt="producing music"
              />
            </div>
            <div className="col-sm-6 text-center text-white">
              <h4 className="display-6">Header</h4>
              <h2 className="display-5">Lorem ipsum dolor sit amet.</h2>
              <Link to="/" className="btn btn-white my-2">
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
