import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ID } from "../../../utils/misc";

import {
  getArtists,
  addArtist,
  removeArtist,
  editArtist
} from "../../../actions/productActions";

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
    this.state.artists.map(item => {
      const modalId = ID();

      return (
        <div key={item._id} className="current-artist">
          <span>{item.name}</span>
          <button
            type="button"
            className="ml-3 btn btn-sm btn-outline-warning"
            data-toggle="modal"
            data-target={`#${modalId}`}
          >
            <i className="fas fa-edit" />
          </button>
          <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Artist
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Formik
                    initialValues={{
                      name: item.name
                    }}
                    validationSchema={Yup.object().shape({
                      name: Yup.string()
                        .max(100, "Artist can only be 100 characters")
                        .required("Enter a name")
                    })}
                    onSubmit={values => {
                      this.props
                        .dispatch(editArtist(item._id, values))
                        .then(response => {
                          window.location.reload();
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
                            placeholder="Name"
                          />
                          {touched.name && errors.name && (
                            <p className="text-danger pt-1">{errors.name}</p>
                          )}
                        </div>

                        <button
                          disabled={isSubmitting}
                          className="btn btn-primary"
                          type="submit"
                        >
                          Edit Artist
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => this.removeArtist(item._id)}
            className="ml-3 btn btn-sm btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      );
    });

  removeArtist = id => {
    this.props.dispatch(removeArtist(id, this.state.artists)).then(response => {
      this.setState({ artists: response.payload.artists });
    });
  };

  render() {
    return (
      <div className="manage-artists">
        <div className="container py-5">
          <div className="current-artists">
            <h5>Current Artists</h5>
            {this.showCurrentArtists()}
          </div>

          <hr />

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
