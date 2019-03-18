import React from "react";

import Image00 from "../../resources/img/featured-image-01.jpg";
// import Image01 from "../../resources/img/featured-image-02.jpg";
// import Image02 from "../../resources/img/featured-image-03.jpg";
import ProductCard from "../Utils/ProductCard";

const Featured = props => {
  const renderCards = () =>
    props.list
      ? props.list.map((item, index) => (
          <div key={index} className="col-sm-4">
            <ProductCard type="featured" {...item} image={Image00} />
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
