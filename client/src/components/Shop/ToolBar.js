import React, { Fragment } from "react";

const ToolBar = ({ mobile, handleGrid, grid, filter }) => {
  return (
    <div className="mobile-shop-toolbar">
      <h4 className="mb-0">Beats</h4>
      <div className="mobile-shop-toolbar-buttons">
        {mobile ? (
          <button className="btn btn-sm btn-outline-primary ml-2">Sort</button>
        ) : null}

        {mobile ? (
          <Fragment>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary ml-2"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Filter
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Filters
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">{filter}</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : null}

        {mobile ? null : (
          <button className="btn btn-sm ml-2" onClick={() => handleGrid()}>
            <i className={grid === "4" ? `fas fa-th-large` : "fas fa-th"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolBar;
