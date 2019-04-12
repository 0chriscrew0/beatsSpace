import React from "react";

const ProductImages = ({ images }) => {
  return (
    <div className="product-images">
      <img className="img-fluid" src={images[0].url} alt="Product" />
    </div>
  );
};

export default ProductImages;
