import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Spinner from "../../Utils/Spinner";

import { getSiteInfo, editSiteInfo } from "../../../actions/siteActions";

class ManageSite extends Component {
  state = {
    success: false
  };

  componentDidMount() {
    this.props.dispatch(getSiteInfo());
  }

  render() {
    return (
      <div className="manage-site">
        {this.props.site.siteInfo ? (
          <div className="container py-5">
            <h3>Manage Site Information</h3>
            <div className="py-4">
              <Formik
                initialValues={{
                  phone: this.props.site.siteInfo.phone,
                  email: this.props.site.siteInfo.email,
                  address: this.props.site.siteInfo.address,
                  promotionHeader: this.props.site.promotion.promotionHeader,
                  promotionText: this.props.site.promotion.promotionText,
                  promotionButton: this.props.site.promotion.promotionButton
                }}
                validationSchema={Yup.object().shape({
                  phone: Yup.string()
                    .max(20, "Phone can only be 20 characters")
                    .required("Enter phone number"),
                  email: Yup.string()
                    .max(100, "Email can only be 100 characters")
                    .required("Enter email"),
                  address: Yup.string()
                    .max(100, "Address can only be 100 characters")
                    .required("Enter address"),
                  promotionHeader: Yup.string()
                    .max(100, "Promotion header can only be 100 characters")
                    .required("Enter a promotion header"),
                  promotionText: Yup.string()
                    .max(500, "Promotion text can only be 500 characters")
                    .required("Enter promotion text"),
                  promotionButton: Yup.string()
                    .max(20, "Promotion header can only be 20 characters")
                    .required("Enter promotion button text")
                })}
                onSubmit={values => {
                  const dataToSubmit = {
                    promotion: {
                      promotionHeader: values.promotionHeader,
                      promotionText: values.promotionText,
                      promotionButton: values.promotionButton
                    },
                    siteInfo: {
                      phone: values.phone,
                      email: values.email,
                      address: values.address
                    }
                  };
                  this.props
                    .dispatch(editSiteInfo(dataToSubmit))
                    .then(response => {
                      this.setState({ success: true });
                      setInterval(() => {
                        window.location.reload();
                      }, 3000);
                    });
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <Field
                        className={`form-control ${touched.phone &&
                          errors.phone &&
                          "is-invalid"}`}
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-danger pt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        className={`form-control ${touched.email &&
                          errors.email &&
                          "is-invalid"}`}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                      {touched.email && errors.email && (
                        <p className="text-danger pt-1">{errors.email}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <Field
                        className={`form-control ${touched.address &&
                          errors.address &&
                          "is-invalid"}`}
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                      />
                      {touched.address && errors.address && (
                        <p className="text-danger pt-1">{errors.address}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="promotionHeader">Promotion Header</label>
                      <Field
                        className={`form-control ${touched.promotionHeader &&
                          errors.promotionHeader &&
                          "is-invalid"}`}
                        type="text"
                        name="promotionHeader"
                        id="promotionHeader"
                        placeholder="Promotion header text"
                      />
                      {touched.promotionHeader && errors.promotionHeader && (
                        <p className="text-danger pt-1">
                          {errors.promotionHeader}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="promotionText">Promotion Text</label>
                      <Field
                        className={`form-control ${touched.promotionText &&
                          errors.promotionText &&
                          "is-invalid"}`}
                        type="text"
                        name="promotionText"
                        id="promotionText"
                        placeholder="Promotion body text"
                      />
                      {touched.promotionText && errors.promotionText && (
                        <p className="text-danger pt-1">
                          {errors.promotionText}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="promotionButton">Promotion Button</label>
                      <Field
                        className={`form-control ${touched.promotionButton &&
                          errors.promotionButton &&
                          "is-invalid"}`}
                        type="text"
                        name="promotionButton"
                        id="promotionButton"
                        placeholder="Promotion button text"
                      />
                      {touched.promotionButton && errors.promotionButton && (
                        <p className="text-danger pt-1">
                          {errors.promotionButton}
                        </p>
                      )}
                    </div>

                    <button
                      disabled={isSubmitting}
                      className="btn btn-block btn-primary"
                      type="submit"
                    >
                      Update Site
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            {this.state.success ? (
              <span className="mt-3 p-2 rounded bg-success">
                Site updated successfully, reloading in 3 seconds
              </span>
            ) : null}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(ManageSite);
