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
      <div className="container py-5">
        <Form>
          <div>
            {touched.firstname && errors.firstname && <p>{errors.firstname}</p>}
            <Field
              className="form-control"
              type="text"
              name="firstname"
              placeholder="First Name"
            />
          </div>
          <div>
            {touched.lastname && errors.lastname && <p>{errors.lastname}</p>}
            <Field
              className="form-control"
              type="text"
              name="lastname"
              placeholder="Last Name"
            />
          </div>

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
          <div>
            {touched.password2 && errors.password2 && <p>{errors.password2}</p>}
            <Field
              className="form-control"
              type="password"
              name="password2"
              placeholder="Confirm Password"
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
          <p>Already have an account?</p>
          <Link className="btn btn-outline-primary" to="/login">
            Login
          </Link>
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
    firstname: Yup.string()
      .min(2)
      .required(),
    lastname: Yup.string()
      .min(2)
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
    password2: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required()
  }),
  handleSubmit(values, { props }) {
    props.dispatch(registerUser(values)).then(response => {
      if (response.payload.success) {
        props.history.push("/login");
      }
    });
  }
})(connect()(Register));
