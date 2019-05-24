import React, { Component } from "react";

import PaypalExpressButton from "react-paypal-express-checkout";

class Paypal extends Component {
  render() {
    const onSuccess = payment => {};

    const onCancel = data => {};

    const onError = err => {};

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.paymentTotal;

    const client = {
      sandbox:
        "AZ0WTsm6SeyIyynUgLHIcmPLzNOuzPh3zrVYtteXl6BxrOEN_np2dLz_2uPYIn1EU5DIE16dnu0sBm7G",
      production: ""
    };

    return (
      <div>
        <PaypalExpressButton
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}

export default Paypal;
