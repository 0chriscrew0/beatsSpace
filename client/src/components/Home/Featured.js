import React from "react";

import Image01 from "../../resources/img/featured-image-01.jpg";
import Image02 from "../../resources/img/featured-image-02.jpg";
import Image03 from "../../resources/img/featured-image-03.jpg";
import HomeCard from "./HomeCard";

const Featured = () => {
  const cardType = "featured";

  return (
    <section className="featured">
      <div className="container">
        <h4 className="display-5 featured-title">Best Sellers</h4>
        <div className="row">
          <div className="col-sm-4">
            <HomeCard
              type={cardType}
              image={Image01}
              name="Sick Beat"
              price={24.99}
            />
          </div>
          <div className="col-sm-4">
            <HomeCard
              type={cardType}
              image={Image02}
              name="Trap Beat"
              price={15}
            />
          </div>
          <div className="col-sm-4">
            <HomeCard
              type={cardType}
              image={Image03}
              name="Fire Beat"
              price={54.95}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
