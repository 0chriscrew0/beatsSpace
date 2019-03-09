import React from "react";

const Account = () => {
  return (
    <div className="account p-4">
      <div className="container">
        <div className="row">
          <div className="col account-section account-section-info">
            <h4>Account Info</h4>
            <div>
              <span>name</span>
              <span>lastname</span>
              <span>"Ball Boy"</span>
              <span>email@gmail.com</span>
            </div>
          </div>
          <div className="col account-section account-section-history">
            <h4>Purchase History</h4>
            <div>History</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
