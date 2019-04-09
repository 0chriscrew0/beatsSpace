import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { getArtists, addArtist } from "../../../actions/productActions";

class ManageArtists extends Component {
  state = {
    artists: []
  };

  componentDidMount() {
    this.props.dispatch(getArtists()).then(response => {
      this.setState({ artists: response.payload });
    });
  }

  showCurrentArtists = () =>
    this.state.artists.map(item => (
      <div key={item._id} className="current-artist">
        <p>{item.name}</p>
      </div>
    ));

  render() {
    return (
      <div className="manage-artists">
        <div className="container py-5">
          <div className="current-artists">
            <h5>Current Artists</h5>
            {this.showCurrentArtists()}
          </div>
          <h4>Add New Artist</h4>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Enter a name")
            })}
            onSubmit={values => {
              this.props
                .dispatch(addArtist(values, this.state.artists))
                .then(response => {
                  if (response.payload.success) {
                    this.props.history.push("/admin/manage-artists");
                  }
                });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <Field
                    className={`form-control ${touched.name &&
                      errors.name &&
                      "is-invalid"}`}
                    type="text"
                    name="name"
                    placeholder="new artist name"
                  />
                  {touched.name && errors.name && (
                    <p className="pt-1 text-danger">{errors.name}</p>
                  )}
                </div>

                <button
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ManageArtists);
