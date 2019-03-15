import React, { Component } from "react";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

class Layout extends Component {
  render() {
    return (
      <div className="flex-wrapper">
        <div>
          <Header />
          <div
            className={window.location.pathname !== "/" ? "main-content" : null}
          >
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
