import React from "react";

import DefaultImage from "../../resources/img/logo.png";

const HomeCard = ({ image, name, price, type }) => (
  <div className={`card ${type}-card`}>
    <img
      className={`card-img-top img-fluid ${type}-card__img`}
      src={image ? image : DefaultImage}
      alt="beat"
    />
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">{`$${price}`}</p>
    </div>
  </div>
);

export default HomeCard;
