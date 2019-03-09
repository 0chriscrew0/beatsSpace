import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  update,
  formatData,
  validateForm
} from "../../utils/Forms/FormActions";

import FormField from "../../utils/Forms/FormField";

import { loginUser } from "../../actions/userActions";

class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email",
          type: "email",
          placeholder: "Email"
        },
        validation: {
          required: true,
          email: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password",
          type: "password",
          placeholder: "Password"
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "login");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let formattedData = formatData(this.state.formData, "login");
    let isFormValid = validateForm(this.state.formData);

    if (isFormValid) {
      this.props.dispatch(loginUser(formattedData)).then(response => {
        if (response.payload.loginSuccess) {
          console.log(response.payload);
          this.props.history.push("/dashboard");
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="container mt-5 login-container">
        <div className="row my-5">
          <div className="col-md-6 mx-auto login-form">
            <h3 className="text-secondary">BeatsStore</h3>
            <form onSubmit={event => this.submitForm(event)}>
              <div className="form-group">
                <FormField
                  type="text"
                  className="form-control"
                  placeholder="Your Email *"
                  id="email"
                  formData={this.state.formData.email}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form-group">
                <FormField
                  type="password"
                  className="form-control"
                  placeholder="Your Password *"
                  id="password"
                  formData={this.state.formData.password}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form-group">
                {this.state.formError && <div>Please provide valid data.</div>}
              </div>
              <div className="form-group">
                <button
                  className="btnSubmit"
                  onClick={event => this.submitForm(event)}
                >
                  Login
                </button>
              </div>
              <div className="form-group">
                <Link to="#" className="ForgotPwd">
                  Forgot Password?
                </Link>
              </div>
              <div className="form-group">
                <span>
                  Don't have an account?{" "}
                  <Link to="/register">Make an Account</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
