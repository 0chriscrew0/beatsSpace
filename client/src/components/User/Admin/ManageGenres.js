import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  getGenres,
  addGenre,
  removeGenre
} from "../../../actions/productActions";

class ManageGenres extends Component {
  state = {
    genres: []
  };

  componentDidMount() {
    this.props.dispatch(getGenres()).then(response => {
      this.setState({ genres: response.payload });
    });
  }

  showCurrentGenres = () =>
    this.state.genres.map(item => (
      <div key={item._id} className="current-genre">
        <span>{item.name}</span>
        <button
          onClick={() => this.removeGenre(item._id)}
          className="ml-3 btn btn-sm btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    ));

  removeGenre = id => {
    this.props.dispatch(removeGenre(id, this.state.genres)).then(response => {
      this.setState({ genres: response.payload.genres });
    });
  };

  render() {
    return (
      <div className="manage-genres">
        <div className="container py-5">
          <div className="current-genres">
            <h5>Current Genres</h5>
            {this.showCurrentGenres()}
          </div>
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
