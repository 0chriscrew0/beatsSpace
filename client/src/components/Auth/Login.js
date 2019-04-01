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
      <div className="container py-5">
        <Form>
          <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>

          <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button
            disabled={isSubmitting}
            className="btn btn-primary"
            type="submit"
          >
            Submit
          </button>
        </Form>

        <div>
          <p>Don't have an account?</p>
          <Link className="btn btn-outline-primary" to="/register">
            Register
          </Link>
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
      .email()
      .required(),
    password: Yup.string().required()
  }),
  handleSubmit(values, { props }) {
    props.dispatch(loginUser(values)).then(response => {
      if (response.payload.success) {
        props.history.push("/user/dashboard");
      }
    });
  }
})(connect()(Login));
