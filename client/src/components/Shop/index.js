import React, { Component } from "react";

import { connect } from "react-redux";
import {
  getProducts,
  getArtists,
  getGenres
} from "../../actions/productActions";
import SizeSensitive from "../../hoc/SizeSensitive";
import ToolBar from "./ToolBar";
import LoadProductCards from "./LoadProductCards";
import Filter from "./Filter";

class Shop extends Component {
  state = {
    grid: "4",
    mobileGrid: "12",
    limit: 6,
    skip: 0,
    filters: {
      artist: [],
      genre: [],
      price: {}
    }
  };

  componentDidMount() {
    this.props.dispatch(getArtists());
    this.props.dispatch(getGenres());

    this.props.dispatch(
      getProducts(this.state.skip, this.state.limit, this.state.filters)
    );
  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      newFilters[category] = [filters.minValue, filters.maxValue];
    }

    this.showFiltered(newFilters);
    this.setState({ filters: newFilters });
  };

  showFiltered = filters => {
    this.props.dispatch(getProducts(0, this.state.limit, filters)).then(() => {
      this.setState({ skip: 0 });
    });
  };

  loadMore = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        getProducts(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.beats
        )
      )
      .then(() => {
        this.setState({ skip });
      });
  };

  handleGrid = () => {
    this.setState({
      grid: this.state.grid === "4" ? "6" : "4",
      mobileGrid: this.state.mobileGrid === "12" ? "6" : "12"
    });
  };

  render() {
    const products = this.props.products;

    const mobileContent = (
      <div className="mobile-shop">
        <ToolBar
          mobile
          grid={this.state.mobileGrid}
          handleGrid={() => this.handleGrid()}
          filter={
            <Filter products={products} handleFilters={this.handleFilters} />
          }
        />
        <LoadProductCards
          grid={this.state.mobileGrid}
          limit={this.state.limit}
          size={products.size}
          beats={products.beats}
          loadMore={() => this.loadMore()}
        />
      </div>
    );

    const regularContent = (
      <div className="container shop">
        <div className="row">
          <div className="col-sm-3">
            <Filter products={products} handleFilters={this.handleFilters} />
          </div>
          <div className="col-sm-9">
            <ToolBar
              grid={this.state.grid}
              handleGrid={() => this.handleGrid()}
            />
            <LoadProductCards
              grid={this.state.grid}
              limit={this.state.limit}
              size={products.size}
              beats={products.beats}
              loadMore={() => this.loadMore()}
            />
          </div>
        </div>
      </div>
    );

    return (
      <SizeSensitive
        mobileContent={mobileContent}
        regularContent={regularContent}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Shop);
