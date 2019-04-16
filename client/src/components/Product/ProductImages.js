import React from "react";

const ProductImages = ({ product }) => {
  return (
    <div className="product-images">
      <img className="img-fluid" src={product.images[0].url} alt="Product" />
    </div>
  );
};

export default ProductImages;
