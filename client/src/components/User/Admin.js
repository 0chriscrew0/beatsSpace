import React from "react";

import UserDashBoard from ".";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <UserDashBoard>
      <div className="admin">
        <div className="container">
          <div className="manage-content-links">
            <h4>Manage Content</h4>
            <Link to="/admin/add-product">Add Product</Link>
            <Link to="/admin/manage-artists">Manage Artists</Link>
            <Link to="/admin/manage-genres">Manage Genres</Link>
            <Link to="/admin/manage-products">Manage Products</Link>
            <Link to="/admin/manage-site">Manage Site</Link>
          </div>
        </div>
      </div>
    </UserDashBoard>
  );
};

export default Admin;
