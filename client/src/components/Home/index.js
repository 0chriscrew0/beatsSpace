import React, { Component } from "react";

import Hero from "./Hero";
import Featured from "./Featured";
import Promotion from "./Promotion";
import NewArrivals from "./NewArrivals";

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <Hero />
        <Featured />
        <Promotion />
        <NewArrivals />
      </div>
    );
  }
}

export default Home;
