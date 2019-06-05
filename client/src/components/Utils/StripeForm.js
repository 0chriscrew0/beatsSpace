import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class StripeForm extends Component {
  handleSubmit = async e => {
    e.preventDefault();

    let { token } = await this.props.stripe.createToken();
    const amount = this.props.amount;

    const paymentData = await fetch("/api/stripe-payment", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ token, amount })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        const formattedData = {
          paymentID: data.id,
          ...data
        };

        return formattedData;
      });

    this.props.onSuccess(paymentData);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CardElement className="py-3" />
          <button className="btn btn-primary">Place Order</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(StripeForm);
