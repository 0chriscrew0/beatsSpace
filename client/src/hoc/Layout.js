import React, { Component } from "react";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

class Layout extends Component {
  render() {
    return (
      <div className="flex-wrapper">
        <div>
          <Header />
          {this.props.children}
        </div>

        <Footer />
      </div>
    );
  }
}

export default Layout;
