import React from "react";
import { Link } from "react-router-dom";

import DefaultImage from "../../resources/img/featured-image-01.jpg";

const ProductCard = ({ _id, images, name, price }) => {
  return (
    <div className="card product-card bg-white border-0`">
      <div className="card-img-wrapper">
        <img
          className={`card-img-top img-fluid product-card__img`}
          src={images ? images[0].url : DefaultImage}
          alt="beat"
        />
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
};

export default ProductCard;
