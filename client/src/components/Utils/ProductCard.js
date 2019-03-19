import React from "react";
import { Link } from "react-router-dom";

import DefaultImage from "../../resources/img/featured-image-01.jpg";

const ProductCard = ({ type, _id, image, name, price }) => {
  return (
    <div className={`card ${type}-card`}>
      <img
        className={`card-img-top img-fluid ${type}-card__img`}
        src={image ? image : DefaultImage}
        alt="beat"
      />
      <div className="card-body">
        <h5 className="card-title display-6">
          <div>{name}</div>
          <div>{`$${price}`}</div>
        </h5>

        {/* <div className="product-card-preview">
          <button className="btn btn-sm btn-default">
            <i className="fas fa-play" />
          </button>
        </div> */}
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
};

export default ProductCard;
