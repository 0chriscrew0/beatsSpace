import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
  AccordionItemState
} from "react-accessible-accordion";

import CheckBoxGroup from "./CheckBoxGroup";
import RadioGroup from "./RadioGroup";

import { prices } from "../Utils/StaticCategories";

const Filter = ({ products, handleFilters }) => {
  return (
    <div>
      <Accordion
        allowMultipleExpanded
        allowZeroExpanded
        preExpanded={["artists", "genres", "price"]}
        className="accordion"
        id="accordionExample"
      >
        <AccordionItem uuid="artists" className="filter-card">
          <AccordionItemHeading className="filter-card-header">
            <AccordionItemButton className="filter-card-button">
              <span className="filter-card-title">Artists</span>
              <AccordionItemState>
                {({ expanded }) => (
                  <i
                    className={`fas fa-chevron-down filter-icon ${
                      expanded ? "filter-icon-expanded" : null
                    }`}
                  />
                )}
              </AccordionItemState>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="filter-card-body">
            <CheckBoxGroup
              list={products.artists}
              handleFilters={filters => handleFilters(filters, "artist")}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="genres" className="filter-card">
          <AccordionItemHeading className="filter-card-header">
            <AccordionItemButton className="filter-card-button">
              <span className="filter-card-title">Genres</span>
              <AccordionItemState>
                {({ expanded }) => (
                  <i
                    className={`fas fa-chevron-down filter-icon ${
                      expanded ? "filter-icon-expanded" : null
                    }`}
                  />
                )}
              </AccordionItemState>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="filter-card-body">
            <CheckBoxGroup
              list={products.genres}
              handleFilters={filters => handleFilters(filters, "genre")}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="price" className="filter-card">
          <AccordionItemHeading className="filter-card-header">
            <AccordionItemButton className="filter-card-button">
              <span className="filter-card-title">Price</span>
              <AccordionItemState>
                {({ expanded }) => (
                  <i
                    className={`fas fa-chevron-down filter-icon ${
                      expanded ? "filter-icon-expanded" : null
                    }`}
                  />
                )}
              </AccordionItemState>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="filter-card-body">
            <RadioGroup
              list={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
