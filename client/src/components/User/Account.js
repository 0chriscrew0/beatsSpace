import React from "react";

import UserDashboard from ".";

const Account = props => {
  return (
    <UserDashboard>
      <div className="account">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-0 account-section account-section-info">
              <h4>Account Info</h4>
              <div>
                <span>{props.user.userData.firstname}</span>
                <span>{props.user.userData.lastname}</span>
                <span>{props.user.userData.email}</span>
              </div>
            </div>
            <div className="col-12 account-section account-section-history">
              <h4>Purchase History</h4>
              <div>History</div>
            </div>
          </div>
        </div>
      </div>
    </UserDashboard>
  );
};

export default Account;
