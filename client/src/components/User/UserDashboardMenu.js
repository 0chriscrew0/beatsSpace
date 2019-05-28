import React from "react";
import { NavLink } from "react-router-dom";

const UserDashboardMenu = ({ user }) => {
  return (
    <div>
      <ul className="nav flex-column border py-4">
        <li className="nav-item">
          <NavLink to="/user/account" className="nav-link">
            <h6>Account</h6>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user/profile" className="nav-link">
            <h6>Profile</h6>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user/cart" className="nav-link">
            <h6>My Cart</h6>
          </NavLink>
        </li>
        {user.userData.isAdmin && (
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              <h6>Admin</h6>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserDashboardMenu;
