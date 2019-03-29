import React, { Fragment } from "react";

import Account from "./Account";
import Profile from "./Profile";
import Cart from "./Cart";
import Admin from "./Admin";

const UserDashboard = props => {
  const { isAdmin } = props.user.userData;

  return (
    <div className="container user-dashboard-wrapper">
      <h4 className="pb-3 pt-4">My Account</h4>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="account-tab"
            data-toggle="tab"
            href="#account"
            role="tab"
            aria-controls="account"
            aria-selected="true"
          >
            Account
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Profile
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="cart-tab"
            data-toggle="tab"
            href="#cart"
            role="tab"
            aria-controls="cart"
            aria-selected="false"
          >
            My Cart
          </a>
        </li>
        {isAdmin ? (
          <Fragment>
            <li className="nav-item">
              <a
                className="nav-link"
                id="site-info-tab"
                data-toggle="tab"
                href="#site-info"
                role="tab"
                aria-controls="site-info"
                aria-selected="false"
              >
                Admin
              </a>
            </li>
          </Fragment>
        ) : null}
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="account"
          role="tabpanel"
          aria-labelledby="account-tab"
        >
          <Account user={props.user.userData} />
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <Profile />
        </div>
        <div
          className="tab-pane fade"
          id="cart"
          role="tabpanel"
          aria-labelledby="cart-tab"
        >
          <Cart />
        </div>
        {isAdmin ? (
          <Fragment>
            <div
              className="tab-pane fade"
              id="site-info"
              role="tabpanel"
              aria-labelledby="site-info-tab"
            >
              <Admin />
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default UserDashboard;
