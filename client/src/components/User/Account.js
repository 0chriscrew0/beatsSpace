import React from "react";
import moment from "moment";

import UserDashboard from ".";

const Account = props => {
  const renderHistory = () =>
    props.user.userData.history.map((item, i) => (
      <tr key={i}>
        <td className="px-2">{item.name}</td>
        <td className="px-2">${item.price}</td>
        <td className="px-2">
          {moment(item.dateofPurchase).format("MM-DD-YYYY")}
        </td>
      </tr>
    ));

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
              {props.user.userData.history.length ? (
                <table>
                  <thead>
                    <tr>
                      <th className="px-2">Title</th>
                      <th className="px-2">Price</th>
                      <th className="px-2">Date Purchased</th>
                    </tr>
                  </thead>
                  <tbody>{renderHistory()}</tbody>
                </table>
              ) : (
                <p className="text-muted mb-0 py-3">
                  You have no previous orders placed.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </UserDashboard>
  );
};

export default Account;
