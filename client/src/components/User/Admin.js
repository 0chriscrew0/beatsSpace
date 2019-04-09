import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin">
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
  );
};

export default Admin;
