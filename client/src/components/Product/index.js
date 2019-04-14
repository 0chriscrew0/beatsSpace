import React, { Component } from "react";
import { connect } from "react-redux";

import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

import {
  getProductDetails,
  clearProductDetails
} from "../../actions/productActions";
import Spinner from "../Utils/Spinner";

class Product extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getProductDetails(id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetails());
  }

  renderProduct = () => {
    const { productDetails } = this.props.products;

    return (
      <div className="product-wrapper">
        <h4>{productDetails.name}</h4>

        <div className="product-content row py-3">
          <div className="col-md-6 py-2">
            <ProductImages images={productDetails.images} />
          </div>
          <div className="col-md-6 py-2">
            <ProductInfo product={productDetails} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="product-page">
        <div className="container">
          {this.props.products.productDetails ? (
            this.renderProduct()
          ) : (
            <Spinner />
          )}
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

export default connect(mapStateToProps)(Product);
