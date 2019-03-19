import React from "react";
import ProductCard from "./ProductCard";

const ProductCardGroup = props => {
  const renderCards = () => {
    return props.beats
      ? props.beats.map(beat => {
          return (
            <div className={`col-${props.grid} my-2`} key={beat._id}>
              <ProductCard {...beat} />
            </div>
          );
        })
      : null;
  };

  return (
    <div className="product-card-group">
      <div>
        <div>
          {props.beats ? (
            props.beats.length === 0 ? (
              <div>No Results</div>
            ) : (
              <div className="container-fluid">
                <div className="row my-2">{renderCards()}</div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCardGroup;
