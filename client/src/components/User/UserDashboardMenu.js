import React from "react";
import { NavLink } from "react-router-dom";

const UserDashboardMenu = ({ user }) => {
  return (
    <div>
      <ul className="nav pb-0">
        <li className="nav-item">
          <NavLink
            to="/user/account"
            className="nav-link btn btn-sm btn-outline-primary border-0 rounded-0 rounded-top p-2"
          >
            Account
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/user/profile"
            className="nav-link btn btn-sm btn-outline-primary border-0 rounded-0 rounded-top p-2"
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/user/cart"
            className="nav-link btn btn-sm btn-outline-primary border-0 rounded-0 rounded-top p-2"
          >
            My Cart
          </NavLink>
        </li>
        {user.userData.isAdmin && (
          <li className="nav-item">
            <NavLink
              to="/admin"
              className="nav-link btn btn-sm btn-outline-primary border-0 rounded-0 rounded-top p-2"
            >
              Admin
            </NavLink>
          </li>
        )}
      </ul>
      <hr className="mt-0" />
    </div>
  );
};

export default UserDashboardMenu;
