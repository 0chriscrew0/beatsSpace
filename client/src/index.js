import React from "react";
import ReactDOM from "react-dom";
import "./resources/css/main.css";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import PromiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import Reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(
  PromiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("root")
);
