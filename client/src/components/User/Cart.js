import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCartDetails, removeFromCart } from "../../actions/userActions";
import Spinner from "../Utils/Spinner";
import CartItem from "./CartItem";

class Cart extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props
      .dispatch(getCartDetails(this.props.user.userData.cart))
      .then(() => {
        this.setState({ loading: false });
      });
  }

  renderCartItems = () =>
    this.props.user.userData.cartDetails ? (
      this.props.user.userData.cartDetails.map(item => (
        <div key={item._id}>
          <CartItem item={item} removeItem={this.removeItem} />
          <hr className="my-1" />
        </div>
      ))
    ) : (
      <div>
        <h4>Your cart is empty!</h4>
        <Link to="/shop" className="btn btn-secondary">
          Go to Store
        </Link>
      </div>
    );

  calculateSubtotal = () => {
    let total = 0;
    this.props.user.userData.cartDetails &&
      this.props.user.userData.cartDetails.forEach(item => {
        total += item.price;
      });

    return total;
  };

  removeItem = id => {
    console.log(id);
    this.props.dispatch(removeFromCart(id));
  };

  render() {
    return (
      <div className="cart">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-7 cart-items">
              <h4 className="cart-header">My Cart</h4>
              {this.state.loading ? (
                <Spinner />
              ) : (
                <div>{this.renderCartItems()}</div>
              )}
            </div>
            <div className="col-xs-12 col-md-4 py-4 cart-info">
              <p className="cart-quantity mb-3">
                Subtotal ({this.props.user.userData.cart.length}{" "}
                {this.props.user.userData.cart.length === 1 ? "Item" : "Items"}
                ):
              </p>
              <p className="cart-subtotal lead ml-2 mb-3 text-danger">
                ${this.calculateSubtotal()}
              </p>

              <Link
                to="/user/checkout"
                className="btn btn-block btn-primary mb-3"
              >
                Checkout
              </Link>

              <hr />

              <span>Still looking?</span>
              <Link to="/shop" className="btn btn-sm btn-outline-info ml-2">
                Go to Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Cart);
