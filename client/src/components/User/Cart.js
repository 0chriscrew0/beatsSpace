import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCartDetails } from "../../actions/userActions";
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
          <CartItem item={item} />
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

  render() {
    return (
      <div className="cart">
        <div className="container">
          <h2>My Cart</h2>
          <hr className="mt-2" />
          {this.state.loading ? (
            <Spinner />
          ) : (
            <div>{this.renderCartItems()}</div>
          )}
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
