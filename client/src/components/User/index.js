import React from "react";

import Account from "./Account";
import Profile from "./Profile";
import Cart from "./Cart";

const UserDashboard = () => {
  return (
    <div className="container user-dashboard-wrapper">
      <h4 className="mb-5">My Account</h4>
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
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="account"
          role="tabpanel"
          aria-labelledby="account-tab"
        >
          <Account />
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
      </div>
    </div>
  );
};

export default UserDashboard;
