import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Form, Field, Formik } from "formik";

import UserDashboard from ".";

import { editProfile } from "../../actions/userActions";

const Profile = props => {
  return (
    <UserDashboard>
      <div className="profile">
        <div className="row">
          <div className="col-12 py-4 update-profile">
            <h4 className="pb-3">Profile Information</h4>
            <Formik
              initialValues={{
                firstname: props.user.userData.firstname,
                lastname: props.user.userData.lastname,
                email: props.user.userData.email
              }}
              validationSchema={Yup.object().shape({
                firstname: Yup.string()
                  .max(100, "Name can only be 100 characters")
                  .required("Enter your first name"),
                lastname: Yup.string()
                  .max(100, "Last name can only be 100 characters")
                  .required("Enter your last name"),
                email: Yup.string()
                  .max(100, "Email can only be 100 characters")
                  .required("Enter your email")
              })}
              onSubmit={values => {
                props.dispatch(editProfile(values)).then(response => {
                  window.location.reload();
                });
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="firstname">First Name</label>
                      <Field
                        className={`form-control ${touched.firstname &&
                          errors.firstname &&
                          "is-invalid"}`}
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First Name"
                      />
                      {touched.firstname && errors.firstname && (
                        <p className="text-danger pt-1">{errors.firstname}</p>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lastname">Last Name</label>
                      <Field
                        className={`form-control ${touched.lastname &&
                          errors.lastname &&
                          "is-invalid"}`}
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Last Name"
                      />
                      {touched.lastname && errors.lastname && (
                        <p className="text-danger pt-1">{errors.lastname}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      className={`form-control ${touched.email &&
                        errors.email &&
                        "is-invalid"}`}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                    {touched.email && errors.email && (
                      <p className="text-danger pt-1">{errors.email}</p>
                    )}
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="btn btn-block btn-primary"
                    type="submit"
                  >
                    Update Profile
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </UserDashboard>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Profile);
