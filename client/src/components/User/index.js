import React from "react";
import { connect } from "react-redux";

import UserDashboardMenu from "./UserDashboardMenu";

const UserDashboard = props => {
  return (
    <div className="container user-dashboard-wrapper">
      <div className="row">
        <div className="col-md-4 px-0">
          <UserDashboardMenu user={props.user} />
        </div>
        <div className="col-md-8">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserDashboard);
