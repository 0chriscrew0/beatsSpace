import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import Home from "./components/Home";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </Layout>
  );
};

export default Routes;
