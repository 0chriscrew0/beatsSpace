import React from "react";

import ProductCardGroup from "../Utils/ProductCardGroup";

const LoadProductCards = props => {
  return (
    <div>
      <div className="shop-products">
        <ProductCardGroup grid={props.grid} beats={props.beats} />
      </div>
      {props.size > 0 && props.size >= props.limit ? (
        <div className="shop-load-more text-center my-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => props.loadMore()}
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default LoadProductCards;
