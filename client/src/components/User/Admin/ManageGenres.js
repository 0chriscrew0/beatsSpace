import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ID } from "../../../utils/misc";

import {
  getGenres,
  addGenre,
  removeGenre,
  editGenre
} from "../../../actions/productActions";

class ManageGenres extends Component {
  state = {
    genres: [],
    success: false
  };

  componentDidMount() {
    this.props.dispatch(getGenres()).then(response => {
      this.setState({ genres: response.payload });
    });
  }

  showCurrentGenres = () =>
    this.state.genres.map(item => {
      const modalId = ID();

      return (
        <div key={item._id} className="current-genre">
          <span>{item.name}</span>
          <button
            type="button"
            className="ml-3 btn btn-sm btn-outline-warning"
            data-toggle="modal"
            data-target={`#${modalId}`}
          >
            <ion-icon name="create" /> Edit
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
                    Edit Genre
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
                        .max(100, "Genre can only be 100 characters")
                        .required("Enter a name")
                    })}
                    onSubmit={values => {
                      this.props
                        .dispatch(editGenre(item._id, values))
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
                          Edit Genre
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
            className="ml-3 btn btn-sm btn-outline-danger"
            data-toggle="modal"
            data-target={`#${modalId}-delete`}
          >
            <ion-icon name="trash" /> Delete
          </button>
          <div
            className="modal fade"
            id={`${modalId}-delete`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Delete Genre
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
                  Are your sure you want to delete the genre:{" "}
                  <strong>{item.name}?</strong>
                  {this.state.success && (
                    <div className="mt-3 p-2 rounded bg-success">
                      Genre deleted successfully, reloading in 3 seconds
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.removeGenre(item._id)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

  removeGenre = id => {
    this.props.dispatch(removeGenre(id, this.state.genres)).then(response => {
      this.setState({ success: true }, () => {
        setInterval(() => {
          window.location.reload();
        }, 3000);
      });
    });
  };

  render() {
    return (
      <div className="manage-genres">
        <div className="container py-5">
          <div className="current-genres">
            <h4>Current Genres</h4>
            {this.showCurrentGenres()}
          </div>

          <hr />

          <h4>Add New Genre</h4>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Enter a genre")
            })}
            onSubmit={values => {
              this.props
                .dispatch(addGenre(values, this.state.genres))
                .then(response => {
                  if (response.payload.success) {
                    this.props.history.push("/admin/manage-genres");
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
                    placeholder="new genre name"
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

export default connect(mapStateToProps)(ManageGenres);
