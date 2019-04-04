import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import FileUpload from "../../Utils/FileUpload";

import {
  getArtists,
  getGenres,
  addProduct,
  clearNewProduct
} from "../../../actions/productActions";

class AddProduct extends Component {
  state = {
    artists: [],
    genres: []
  };

  componentDidMount() {
    this.props.dispatch(getArtists()).then(response => {
      this.setState({ artists: response.payload });
    });

    this.props.dispatch(getGenres()).then(response => {
      this.setState({ genres: response.payload });
    });
  }

  render() {
    return (
      <div className="add-product">
        <div className="container py-5">
          <h4 className="py-2">Add Product</h4>

          <Formik
            initialValues={{
              images: [],
              name: "",
              description: "",
              price: "",
              artist: "",
              genre: ""
            }}
            validationSchema={Yup.object().shape({
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
            onSubmit={(values, { setFieldValue }) => {
              this.props
                .dispatch(addProduct(values))
                .then(response => {
                  this.props.dispatch(clearNewProduct());
                })
                .then(() => {
                  this.props.history.push("/shop");
                });
            }}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <FileUpload
                    imageHandler={images => {
                      if (images.length === 0) {
                        return;
                      }

                      setFieldValue("images", images);
                    }}
                  />
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
                    <p className="text-danger pt-1">{errors.description}</p>
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
                    <p className="text-danger pt-1">{errors.description}</p>
                  )}
                </div>

                <button
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  type="submit"
                >
                  Add Product
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

export default connect(mapStateToProps)(AddProduct);
