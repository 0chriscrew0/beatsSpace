import React, { Component } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";

import StripeForm from "./StripeForm";

class Stripe extends Component {
  render() {
    return (
      <div>
        <StripeProvider
          apiKey="pk_test_4gyyRKwMuie6DMIHDSe5HUOB008w1NYn5G
"
        >
          <Elements>
            <StripeForm
              amount={this.props.amount}
              onSuccess={this.props.onSuccess}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default Stripe;
