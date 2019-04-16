import React, { Component } from "react";
import { connect } from "react-redux";

import ProductActions from "./ProductActions";
import ProductImages from "./ProductImages";

import {
  getProductDetails,
  clearProductDetails
} from "../../actions/productActions";
import Spinner from "../Utils/Spinner";
import AudioPlayer from "./AudioPlayer";

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
        <div className="product-content py-3">
          <div className="row flex-row">
            <div className="col-md-6">
              <h1>{productDetails.name}</h1>
            </div>
            <div className="col-md-6">
              <ProductImages product={productDetails} />
              <AudioPlayer audio={productDetails.audio} />
            </div>
            <div className="col-md-6">
              <ProductActions product={productDetails} />
            </div>
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
