import React from "react";

import ProductCard from "../Utils/ProductCard";

const NewArrivals = props => {
  const renderCards = () =>
    props.list
      ? props.list.map((item, index) => (
          <div key={index} className="col-sm-6 col-lg-3">
            <ProductCard {...item} />
          </div>
        ))
      : null;

  return (
    <section className="new-arrivals">
      <div className="container">
        <h4 className="display-5 new-arrivals-title">New Arrivals</h4>
        <div className="row">{renderCards()}</div>
      </div>
    </section>
  );
};

export default NewArrivals;
