import React, { Component } from "react";
import { connect } from "react-redux";

import FileUpload from "../../Utils/FileUpload";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  getProducts,
  editProduct,
  removeProduct,
  getArtists,
  getGenres
} from "../../../actions/productActions";

class ManageGenres extends Component {
  state = {
    products: [],
    artists: [],
    genres: []
  };

  componentDidMount() {
    this.props.dispatch(getProducts()).then(response => {
      this.setState({ products: response.payload });
    });

    this.props.dispatch(getArtists()).then(response => {
      this.setState({ artists: response.payload });
    });

    this.props.dispatch(getGenres()).then(response => {
      this.setState({ genres: response.payload });
    });
  }

  showCurrentProducts = () =>
    this.state.products.map(item => (
      <div key={item._id} className="current-product">
        <span>{item.name}</span>
        <button
          type="button"
          className="ml-3 btn btn-sm btn-outline-warning"
          data-toggle="modal"
          data-target={`#${item.name.replace(/\s+/g, "")}`}
        >
          <i className="fas fa-edit" />
        </button>
        <div
          className="modal fade"
          id={item.name.replace(/\s+/g, "")}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Product
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
                    images: item.images,
                    audio: item.audio,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    artist: item.artist._id,
                    genre: item.genre._id
                  }}
                  validationSchema={Yup.object().shape({
                    audio: Yup.mixed().required("Audio file is required"),
                    name: Yup.string()
                      .max(100, "Title can only be 100 characters")
                      .required(" Enter a title"),
                    description: Yup.string()
                      .max(500, "Description can only be 500 characters")
                      .required("Enter a description"),
                    price: Yup.number().required("Enter a price"),
                    artist: Yup.string().required("Select an artist"),
                    genre: Yup.string().required("Select a genre")
                  })}
                  onSubmit={values => {
                    this.props
                      .dispatch(editProduct(item._id, values))
                      .then(response => {
                        window.location.reload();
                      });
                  }}
                >
                  {({ errors, touched, isSubmitting, setFieldValue }) => (
                    <Form>
                      <div className="form-group">
                        <FileUpload
                          fileType="Image(s)"
                          fileHandler={images => {
                            if (images.length === 0) {
                              return;
                            }

                            setFieldValue("images", images);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <FileUpload
                          fileType="Audio"
                          fileHandler={audio => {
                            if (!audio) {
                              return;
                            }

                            setFieldValue("audio", audio[0]);
                          }}
                        />
                        {touched.audio && errors.audio && (
                          <p className="text-danger pt-1">{errors.audio}</p>
                        )}
                      </div>
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
                      <div className="form-group">
                        <Field
                          className={`form-control ${touched.description &&
                            errors.description &&
                            "is-invalid"}`}
                          type="text"
                          name="description"
                          placeholder="Description"
                        />
                        {touched.description && errors.description && (
                          <p className="text-danger pt-1">
                            {errors.description}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <Field
                          className={`form-control ${touched.price &&
                            errors.price &&
                            "is-invalid"}`}
                          type="number"
                          name="price"
                          placeholder="Price"
                        />
                        {touched.price && errors.price && (
                          <p className="text-danger pt-1">{errors.price}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <Field
                          className={`form-control ${touched.artist &&
                            errors.artist &&
                            "is-invalid"}`}
                          component="select"
                          name="artist"
                        >
                          <option defaultValue>Select artist</option>
                          {this.state.artists.map(artist => (
                            <option key={artist._id} value={artist._id}>
                              {artist.name}
                            </option>
                          ))}
                        </Field>
                        {touched.artist && errors.artist && (
                          <p className="text-danger pt-1">{errors.artist}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <Field
                          className={`form-control ${touched.genre &&
                            errors.genre &&
                            "is-invalid"}`}
                          component="select"
                          name="genre"
                        >
                          <option defaultValue>Select genre</option>
                          {this.state.genres.map(genre => (
                            <option key={genre._id} value={genre._id}>
                              {genre.name}
                            </option>
                          ))}
                        </Field>
                        {touched.description && errors.description && (
                          <p className="text-danger pt-1">
                            {errors.description}
                          </p>
                        )}
                      </div>

                      <button
                        disabled={isSubmitting}
                        className="btn btn-primary"
                        type="submit"
                      >
                        Edit Product
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
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => this.removeProduct(item._id)}
          className="ml-3 btn btn-sm btn-outline-danger"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    ));

  editProduct = id => {};

  removeProduct = id => {
    this.props
      .dispatch(removeProduct(id, this.state.products))
      .then(response => {
        this.setState({ products: response.payload.products });
      });
  };

  render() {
    return (
      <div className="manage-products">
        <div className="container py-5">
          <div className="current-products">
            <h5>Current Products</h5>
            {this.showCurrentProducts()}
          </div>

          <hr />
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
