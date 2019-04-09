import React from "react";

import CheckBoxGroup from "./CheckBoxGroup";
import RadioGroup from "./RadioGroup";

import { prices } from "../Utils/StaticCategories";

const Filter = ({ products, handleFilters }) => {
  return (
    <div>
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
                handleFilters={filters => handleFilters(filters, "artist")}
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
                handleFilters={filters => handleFilters(filters, "genre")}
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
            <div className="card-body">
              <RadioGroup
                list={prices}
                handleFilters={filters => handleFilters(filters, "price")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
