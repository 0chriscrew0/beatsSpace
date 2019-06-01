import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import { loginUser } from "../../actions/userActions";

class Login extends Component {
  render() {
    const { errors, touched, isSubmitting } = this.props;

    return (
      <div className="container">
        <div className="login-container py-5">
          <div className="login-form">
            <h3 className="text-secondary">BeatsSpace</h3>
            <Form>
              <h4 className="pb-1">Login</h4>
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
                  <p className="pt-1 text-danger">{errors.email}</p>
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
                  <p className="py-1 text-danger">{errors.password}</p>
                )}
              </div>

              <button
                disabled={isSubmitting}
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>

              <div className="register-button">
                <p className="">Don't have an account?</p>
                <Link className="btn btn-outline-primary" to="/register">
                  Register
                </Link>
              </div>

              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Enter your email"),
    password: Yup.string().required("Enter your password")
  }),
  handleSubmit(values, { props }) {
    props.dispatch(loginUser(values)).then(response => {
      if (response.payload.success) {
        props.history.push("/user/account");
      }
    });
  }
})(connect()(Login));
