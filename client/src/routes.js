import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import AuthRoute from "./hoc/AuthRoute";

import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import UserDashboard from "./components/User";
import Profile from "./components/User/Profile";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          component={AuthRoute(UserDashboard, true)}
        />

        <Route path="/" component={AuthRoute(Home, null)} exact />
        <Route path="/login" component={AuthRoute(Login, false)} />
        <Route path="/register" component={AuthRoute(Register, false)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
