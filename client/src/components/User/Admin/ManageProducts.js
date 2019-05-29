import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { getProducts, removeProduct } from "../../../actions/productActions";

class ManageGenres extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.props.dispatch(getProducts()).then(response => {
      this.setState({ products: response.payload });
    });
  }

  showCurrentProducts = () =>
    this.state.products.map(item => (
      <div key={item._id} className="current-product">
        <span>{item.name}</span>
        <button
          onClick={() => this.removeProduct(item._id)}
          className="ml-3 btn btn-sm btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    ));

  removeProduct = id => {
    this.props
      .dispatch(removeProduct(id, this.state.products))
      .then(response => {
        this.setState({ products: response.payload.products });
      });
  };

  render() {
    return (
      <div className="manage-products">
        <div className="container py-5">
          <div className="current-products">
            <h5>Current Products</h5>
            {this.showCurrentProducts()}
          </div>

          <hr />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ManageGenres);
