import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  update,
  formatData,
  validateForm
} from "../../utils/Forms/FormActions";

import { connect } from "react-redux";
import { registerUser } from "../../actions/userActions";

import FormField from "../../utils/Forms/FormField";

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name",
          type: "text",
          placeholder: "First Name"
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname",
          type: "text",
          placeholder: "Last Name"
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email",
          type: "email",
          placeholder: "Enter your email"
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
          placeholder: "Create a password"
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      },
      password2: {
        element: "input",
        value: "",
        config: {
          name: "password2",
          type: "password",
          placeholder: "Confirm password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "register");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let formattedData = formatData(this.state.formData, "register");
    let isFormValid = validateForm(this.state.formData);

    if (isFormValid) {
      this.props
        .dispatch(registerUser(formattedData))
        .then(response => {
          if (response.payload.success) {
            this.setState({ formError: false, formSuccess: true });
            setTimeout(() => {
              this.props.history.push("/login");
            }, 3000);
          } else {
            this.setState({ formError: true });
          }
        })
        .catch(err => {
          this.setState({ formError: true });
        });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="container mt-5 login-container">
        <div className="row my-5">
          <div className="col-md-6 mx-auto my-5 login-form">
            <h3>Make an Account</h3>
            {this.state.formSuccess && (
              <div>
                Your account has been created, redirecting you to login page.
              </div>
            )}
            <form onSubmit={event => this.submitForm(event)}>
              <div className="form-group">
                <FormField
                  type="text"
                  className="form-control"
                  id="name"
                  formData={this.state.formData.name}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form-group">
                <FormField
                  type="text"
                  className="form-control"
                  id="lastname"
                  formData={this.state.formData.lastname}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form-group">
                <FormField
                  type="email"
                  className="form-control"
                  id="email"
                  formData={this.state.formData.email}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form-group">
                <FormField
                  type="password"
                  className="form-control"
                  id="password"
                  formData={this.state.formData.password}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form-group">
                <FormField
                  type="password"
                  className="form-control"
                  id="password2"
                  formData={this.state.formData.password2}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form-group">
                {this.state.formError && <div>Please provide valid data.</div>}
              </div>
              <div className="form-group">
                {this.state.formError && <div>Please provide valid data.</div>}
              </div>
              <div className="form-group">
                <button
                  className="btnSubmit"
                  onClick={event => this.submitForm(event)}
                >
                  Register
                </button>
              </div>
              <div className="form-group">
                <span>
                  Already have an account?{" "}
                  <Link to="/login" className="login">
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
