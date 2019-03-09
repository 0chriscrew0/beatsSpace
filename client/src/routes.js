import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import UserDashboard from "./components/User";
import Profile from "./components/User/Profile";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" component={UserDashboard} />
        <Route path="/user/profile" component={Profile} />

        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Layout>
  );
};

export default Routes;
