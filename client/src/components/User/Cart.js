import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getCartDetails,
  removeFromCart,
  onOrderSuccess
} from "../../actions/userActions";
import Spinner from "../Utils/Spinner";
import CartItem from "./CartItem";
import Paypal from "../Utils/Paypal";
import Stripe from "../Utils/Stripe";

class Cart extends Component {
  state = {
    loading: true,
    success: false,
    cartDetails: []
  };

  componentDidMount() {
    this.props
      .dispatch(getCartDetails(this.props.user.userData.cart))
      .then(response => {
        this.setState({ loading: false, cartDetails: response.payload });
      });
  }

  renderCartItems = () =>
    this.state.cartDetails.length ? (
      this.state.cartDetails.map(item => (
        <div key={item._id}>
          <CartItem item={item} removeItem={this.removeItem} />
          <hr className="my-1" />
        </div>
      ))
    ) : (
      <div className="py-5">
        <p className="lead mb-0">Your cart is empty!</p>
        <hr className="my-2" />
        <Link to="/shop" className="btn btn-secondary">
          Go to Store
        </Link>
      </div>
    );

  calculateSubtotal = () => {
    let total = 0;

    this.state.cartDetails.forEach(item => {
      total += item.price;
    });

    return total;
  };

  removeItem = id => {
    this.props.dispatch(removeFromCart(id)).then(response => {
      this.setState({ cartDetails: response.payload });
    });
  };

  transactionError = data => {};

  transactionCanceled = data => {};

  transactionSuccess = payment => {
    this.props
      .dispatch(
        onOrderSuccess({
          cartDetails: this.state.cartDetails,
          paymentData: payment
        })
      )
      .then(() => {
        if (this.props.user.orderSuccess) {
          this.setState({
            success: true,
            cartDetails: []
          });
        }
      });
  };

  render() {
    return (
      <div className="cart">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-7 cart-items">
              <h4 className="cart-header pl-1">My Cart</h4>
              {this.state.loading ? (
                <Spinner />
              ) : (
                <div>{this.renderCartItems()}</div>
              )}
            </div>
            {this.state.cartDetails.length || this.state.success ? (
              <div className="col-xs-12 col-md-4 py-4 cart-info">
                {!this.state.success ? (
                  <React.Fragment>
                    <p className="cart-quantity mb-3">
                      Subtotal ({this.props.user.userData.cart.length}{" "}
                      {this.props.user.userData.cart.length === 1
                        ? "Item"
                        : "Items"}
                      ):
                    </p>
                    <p className="cart-subtotal lead ml-2 mb-3 text-danger">
                      ${this.calculateSubtotal()}
                    </p>

                    <div className="mx-auto">
                      <h6>Checkout with Paypal</h6>
                      <Paypal
                        style={{ textAlign: "center" }}
                        paymentTotal={this.calculateSubtotal()}
                        error={data => this.transactionError(data)}
                        canceled={data => this.transactionCanceled(data)}
                        success={payment => this.transactionSuccess(payment)}
                      />
                    </div>

                    <p className="text-center mb-0 mt-3">or</p>
                    <hr className="mt-0 text-center w-50" />

                    <div className="py-3">
                      <h6>Checkout with Stripe</h6>
                      <Stripe
                        amount={this.calculateSubtotal()}
                        onSuccess={payment => this.transactionSuccess(payment)}
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  <div className="success-total">
                    <h4>Thank You!</h4>
                    <h6>Your order has been completed.</h6>
                  </div>
                )}

                <hr />

                <span>Still looking?</span>
                <Link to="/shop" className="btn btn-sm btn-outline-info ml-2">
                  Go to Store
                </Link>
              </div>
            ) : (
              <div />
            )}
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
