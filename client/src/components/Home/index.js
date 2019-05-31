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
import { getSiteInfo } from "../../actions/siteActions";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySales());
    this.props.dispatch(getProductsByArrival());
    this.props.dispatch(getSiteInfo());
  }

  render() {
    return (
      <div className="home-page">
        <Hero />
        <Featured list={this.props.products.bySales} />
        <Promotion promotion={this.props.site.promotion} />
        <NewArrivals list={this.props.products.byArrival} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    site: state.site
  };
};

export default connect(mapStateToProps)(Home);
