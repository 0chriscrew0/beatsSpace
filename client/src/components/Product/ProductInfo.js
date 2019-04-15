import React from "react";
import { Link } from "react-router-dom";

const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <div>
        <h4>{product.name}</h4>
        <Link to={`/artist/${product.artist._id}`}>{product.artist.name}</Link>
      </div>

      <div className="my-3">
        <p>{product.description}</p>
      </div>

      <div className="my-2">${product.price}</div>

      <button className="btn btn-block btn-primary mt-3">Add to cart</button>
    </div>
  );
};

export default ProductInfo;
