import React, { Component } from "react";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

class Layout extends Component {
  render() {
    return (
      <div className="flex-wrapper">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
