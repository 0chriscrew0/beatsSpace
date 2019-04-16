import React from "react";

const ProductActions = ({ product }) => {
  return (
    <div className="product-actions">
      <h4>${product.price}</h4>
      <button className="btn btn-block btn-primary">Add to cart</button>
    </div>
  );
};

export default ProductActions;
