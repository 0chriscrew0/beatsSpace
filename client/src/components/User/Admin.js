import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin">
      <Link to="/admin/add-product" className="add-product">
        Add Product
      </Link>
    </div>
  );
};

export default Admin;
