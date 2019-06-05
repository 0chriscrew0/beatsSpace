import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

class StripeForm extends Component {
  handleSubmit = async e => {
    e.preventDefault();

    let { token } = await this.props.stripe.createToken();
    const amount = this.props.amount;

    await fetch("/api/stripe-payment", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ token, amount })
    });

    console.log(token);
  };

  render() {
    return (
      <div>
        <Formik />
        <form onSubmit={this.handleSubmit}>
          <CardElement />
          <button className="btn btn-primary">Place Order</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(StripeForm);
