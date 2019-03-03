import React from "react";
import ReactDOM from "react-dom";
import "./resources/css/main.css";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById("root")
);
