import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import AuthRoute from "./hoc/AuthRoute";

import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import UserDashboard from "./components/User";
import Shop from "./components/Shop";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={AuthRoute(Home, null)} exact />
        <Route path="/shop" component={AuthRoute(Shop, null)} />
        <Route
          path="/user/dashboard"
          component={AuthRoute(UserDashboard, true)}
        />

        <Route path="/login" component={AuthRoute(Login, false)} />
        <Route path="/register" component={AuthRoute(Register, false)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
