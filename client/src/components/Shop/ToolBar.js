import React from "react";

const ToolBar = ({ mobile }) => {
  return (
    <div className="mobile-shop-toolbar">
      <h4 className="mb-0">Beats</h4>
      <div className="mobile-shop-toolbar-buttons">
        {mobile ? (
          <button className="btn btn-sm btn-outline-primary">Sort</button>
        ) : null}
        {mobile ? (
          <button className="btn btn-sm btn-outline-primary ml-2">
            Filter
          </button>
        ) : null}

        <button className="btn btn-sm ml-2">
          <i className="fas fa-th-large" />
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
