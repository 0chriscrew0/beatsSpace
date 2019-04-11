import React from "react";

import ProductCard from "../Utils/ProductCard";

const Featured = props => {
  const renderCards = () =>
    props.list
      ? props.list.map((item, index) => (
          <div key={index} className="col-sm-4">
            <ProductCard {...item} />
          </div>
        ))
      : null;

  return (
    <section className="featured">
      <div className="container">
        <h4 className="display-5 featured-title">Best Sellers</h4>
        <div className="row">{renderCards()}</div>
      </div>
    </section>
  );
};

export default Featured;
