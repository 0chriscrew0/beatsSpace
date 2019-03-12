import React from "react";

import Image01 from "../../resources/img/new-arrival-01.jpg";
import Image02 from "../../resources/img/new-arrival-02.jpg";
import Image03 from "../../resources/img/new-arrival-03.jpg";
import Image04 from "../../resources/img/new-arrival-04.jpg";
import HomeCard from "./HomeCard";

const NewArrivals = () => {
  const cardType = "new-arrivals";

  return (
    <section className="new-arrivals">
      <div className="container">
        <h4 className="display-5 new-arrivals-title">New Arrivals</h4>
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <HomeCard
              type={cardType}
              image={Image01}
              name="Amazing Beat"
              price={24.99}
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <HomeCard
              type={cardType}
              image={Image02}
              name="Cool Beat"
              price={15}
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <HomeCard
              type={cardType}
              image={Image03}
              name="Fast Beat"
              price={22.95}
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <HomeCard
              type={cardType}
              image={Image04}
              name="Weird Beat"
              price={13.99}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
