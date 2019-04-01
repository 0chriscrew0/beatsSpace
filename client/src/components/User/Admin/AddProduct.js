import React, { Component } from "react";
import { connect } from "react-redux";

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

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
    const { errors, touched, isSubmitting } = this.props;
    return (
      <div className="add-product py-5">
        <div className="container">
          <h4 className="py-2">Add Product</h4>

          <Form>
            <div className="form-group">
              <Field
                className="form-control"
                type="text"
                name="name"
                placeholder="Name"
              />
              {touched.name && errors.name && <p>{errors.name}</p>}
            </div>
            <div className="form-group">
              <Field
                className="form-control"
                type="text"
                name="description"
                placeholder="Description"
              />
              {touched.description && errors.description && (
                <p>{errors.description}</p>
              )}
            </div>
            <div className="form-group">
              <Field
                className="form-control"
                type="number"
                name="price"
                placeholder="Price"
              />
              {touched.price && errors.price && <p>{errors.price}</p>}
            </div>
            <div className="form-group">
              <Field className="form-control" component="select" name="artist">
                <option defaultValue>Select genre</option>
                {this.state.artists.map(artist => (
                  <option key={artist._id} value={artist._id}>
                    {artist.name}
                  </option>
                ))}
              </Field>
              {touched.artist && errors.artist && <p>{errors.artist}</p>}
            </div>
            <div className="form-group">
              <Field className="form-control" component="select" name="genre">
                <option defaultValue>Select genre</option>
                {this.state.genres.map(genre => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </Field>
              {touched.description && errors.description && (
                <p>{errors.description}</p>
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

export default withFormik({
  mapPropsToValues({ name, description, price, artist, genre }) {
    return {
      name: name || "",
      description: description || "",
      price: price || "",
      artist: artist || "",
      genre: genre || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .max(100)
      .required(),
    description: Yup.string()
      .max(500)
      .required(),
    price: Yup.number().required(),
    artist: Yup.string()
      .max(100)
      .required(),
    genre: Yup.string()
      .max(100)
      .required()
  }),
  handleSubmit(values, { props }) {
    props.dispatch(addProduct(values)).then(response => {
      props.dispatch(clearNewProduct());
    });
  }
})(connect(mapStateToProps)(AddProduct));
