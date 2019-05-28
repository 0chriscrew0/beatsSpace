import React from "react";

import UserDashboardMenu from "./UserDashboardMenu";

const UserDashboard = props => {
  return (
    <div className="container py-5 user-dashboard-wrapper">
      <div className="row">
        <div className="col-md-4">
          <UserDashboardMenu />
        </div>
        <div className="col-md-8">{props.children}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
