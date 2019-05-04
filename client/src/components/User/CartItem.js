import React from "react";

const CartItem = props => {
  const { name, images, artist, genre, price } = props.item;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <div className="cart-item-image-wrapper">
          <img className="img-fluid" src={images[0].url} alt={name} />
        </div>
      </div>

      <div className="cart-item-info">
        <h6>{name}</h6>
        <div>
          <div>
            <strong>Artist: </strong>
            {artist.name}
          </div>
          <div>
            <strong>Genre: </strong>
            {genre.name}
          </div>
        </div>
      </div>

      <div className="cart-item-right ml-auto">
        <div className="cart-item-price ml-auto">${price}</div>
        <button
          style={{ fontSize: "0.7em" }}
          className="btn btn-sm btn-outline-primary"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
