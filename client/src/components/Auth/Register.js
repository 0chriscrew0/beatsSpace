import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import { registerUser } from "../../actions/userActions";

class Register extends Component {
  render() {
    const { errors, touched, isSubmitting } = this.props;
    return (
      <div className="container">
        <div className="register-container py-5">
          <div className="register-form">
            <h3 className="text-secondary">BeatsStore</h3>
            <Form>
              <h4 className="pb-1">Register</h4>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Field
                    className={`form-control ${touched.firstname &&
                      errors.firstname &&
                      "is-invalid"}`}
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                  />
                  {touched.firstname && errors.firstname && (
                    <p className="text-danger pt-1">{errors.firstname}</p>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <Field
                    className={`form-control ${touched.lastname &&
                      errors.lastname &&
                      "is-invalid"}`}
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                  />
                  {touched.lastname && errors.lastname && (
                    <p className="text-danger pt-1">{errors.lastname}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <Field
                  className={`form-control ${touched.email &&
                    errors.email &&
                    "is-invalid"}`}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                {touched.email && errors.email && (
                  <p className="text-danger pt-1">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <Field
                  className={`form-control ${touched.password &&
                    errors.password &&
                    "is-invalid"}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                {touched.password && errors.password && (
                  <p className="text-danger pt-1">{errors.password}</p>
                )}
              </div>
              <div className="form-group">
                <Field
                  className={`form-control ${touched.password2 &&
                    errors.password2 &&
                    "is-invalid"}`}
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                />
                {touched.password2 && errors.password2 && (
                  <p className="text-danger pt-1">{errors.password2}</p>
                )}
              </div>

              <button
                disabled={isSubmitting}
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>

              <div className="login-button">
                <p>Already have an account?</p>
                <Link className="btn btn-outline-primary" to="/login">
                  Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues({ firstname, lastname, email, password, password2 }) {
    return {
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
      password: password || "",
      password2: password2 || ""
    };
  },
  validationSchema: Yup.object().shape({
    firstname: Yup.string().required("Enter your first name"),
    lastname: Yup.string().required("Enter your last name"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Enter your email"),
    password: Yup.string()
      .min(6, "Password must be a minum of 6 characters")
      .required("Please enter a password"),
    password2: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please retype your password")
  }),
  handleSubmit(values, { props }) {
    props.dispatch(registerUser(values)).then(response => {
      if (response.payload.success) {
        props.history.push("/login");
      }
    });
  }
})(connect()(Register));
