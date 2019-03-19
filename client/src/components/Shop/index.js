import React, { Component } from "react";

import { connect } from "react-redux";
import {
  getProducts,
  getArtists,
  getGenres
} from "../../actions/productActions";
import SizeSensitive from "../../hoc/SizeSensitive";
import ToolBar from "./ToolBar";
import CheckBoxGroup from "./CheckBoxGroup";
import RadioGroup from "./RadioGroup";
import LoadProductCards from "./LoadProductCards";

class Shop extends Component {
  state = {
    grid: "4",
    mobileGrid: "12",
    limit: 6,
    skip: 0,
    filters: {
      artist: [],
      genre: [],
      price: []
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
          <div className="col-sm-4">
            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Artists
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                >
                  <div className="card-body">
                    <CheckBoxGroup
                      list={products.artists}
                      handleFilters={filters =>
                        this.handleFilters(filters, "artist")
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      Genres
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse show"
                  aria-labelledby="headingTwo"
                >
                  <div className="card-body">
                    <CheckBoxGroup
                      list={products.genres}
                      handleFilters={filters =>
                        this.handleFilters(filters, "genre")
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      Price
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse show"
                  aria-labelledby="headingThree"
                >
                  <div className="card-body" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
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
