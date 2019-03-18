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

class Shop extends Component {
  state = {
    grid: "",
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

  render() {
    const products = this.props.products;

    const mobileContent = (
      <div className="mobile-shop">
        <ToolBar mobile />
      </div>
    );

    const regularContent = (
      <div className="container shop">
        <div className="row">
          <div className="col-sm-3">
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
          <div className="col-sm-9">
            <ToolBar />
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
