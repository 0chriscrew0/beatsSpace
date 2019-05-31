import React from "react";
import { Link } from "react-router-dom";

const Promotion = ({ promotion }) => {
  return promotion ? (
    <section className="promotion">
      <div className="container my-auto">
        <div className="row">
          <div className="col-12 promotion-item">
            <h4>{promotion.promotionHeader}</h4>
          </div>
          <div className="col-12 promotion-item">{promotion.promotionText}</div>
          <div className="col-12 promotion-item">
            <Link to="/beats" className="btn btn-lg btn-outline-white">
              {promotion.promotionButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Promotion;
