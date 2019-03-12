import React from "react";
import { Link } from "react-router-dom";

const Promotion = () => {
  return (
    <section className="promotion">
      <div className="container my-auto">
        <div className="row">
          <div className="col-12 promotion-item">
            <h4>Current Promotion</h4>
          </div>
          <div className="col-12 promotion-item">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <div className="col-12 promotion-item">
            <Link to="/beats" className="btn btn-lg btn-outline-white">
              See Deal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
