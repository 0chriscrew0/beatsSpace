import React from "react";

import UserDashBoard from ".";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <UserDashBoard>
      <div className="admin">
        <div className="container py-4">
          <div className="manage-content-links">
            <h4>Manage Content</h4>
            <Link to="/admin/add-product" className="add-product">
              Add Product
            </Link>
            <Link to="/admin/manage-artists" className="">
              Manage Artists
            </Link>
            <Link to="/admin/manage-genres" className="">
              Manage Genres
            </Link>
          </div>
        </div>
      </div>
    </UserDashBoard>
  );
};

export default Admin;
