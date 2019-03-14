import React, { Component } from "react";

import Hero from "./Hero";
import Featured from "./Featured";
import Promotion from "./Promotion";
import NewArrivals from "./NewArrivals";

import { connect } from "react-redux";
import {
  getProductsBySales,
  getProductsByArrival
} from "../../actions/productActions";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySales());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div className="home-page">
        <Hero />
        <Featured list={this.props.products.bySales} />
        <Promotion />
        <NewArrivals />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Home);
