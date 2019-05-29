import React from "react";

import UserDashboard from ".";

const Account = props => {
  return (
    <UserDashboard>
      <div className="account">
        <div className="container">
          <div className="row">
            <h4>Account Info</h4>
            <div className="col-12 mt-0 account-section account-section-info">
              <div>
                <span>{props.user.userData.firstname}</span>
                <span>{props.user.userData.lastname}</span>
                <span>{props.user.userData.email}</span>
              </div>
            </div>
            <h4>Purchase History</h4>
            <div className="col-12 mt-0 account-section account-section-history">
              <div>History</div>
            </div>
          </div>
        </div>
      </div>
    </UserDashboard>
  );
};

export default Account;
