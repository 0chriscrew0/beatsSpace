import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <h4>By: {product.artist.name}</h4>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductInfo;
