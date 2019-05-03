import React, { Component } from "react";
import { connect } from "react-redux";
import { getCartDetails } from "../../actions/userActions";

class Cart extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.dispatch(getCartDetails(this.props.user.userData.cart));
  }

  render() {
    return <div className="cart">cart</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Cart);
