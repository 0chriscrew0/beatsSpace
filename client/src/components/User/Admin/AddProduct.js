import React, { Component } from "react";

import FormField from "../../../utils/Forms/FormField";
import {
  update,
  validateForm,
  formatData,
  populateOptions,
  resetFields
} from "../../../utils/Forms/FormActions";

import { connect } from "react-redux";
import {
  getArtists,
  getGenres,
  addProduct,
  clearNewProduct
} from "../../../actions/productActions";

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name",
          type: "text",
          placeholder: "Name"
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          name: "description",
          placeholder: "Product Description"
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      },
      price: {
        element: "input",
        value: "",
        config: {
          name: "price",
          type: "number",
          placeholder: "Price"
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      },
      artist: {
        element: "select",
        value: "",
        config: {
          name: "artist",
          options: []
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      },
      genre: {
        element: "select",
        value: "",
        config: {
          name: "genre",
          options: []
        },
        validation: {
          required: true
        },
        isValid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount() {
    const { formData } = this.state;

    this.props.dispatch(getArtists()).then(response => {
      const newFormData = populateOptions(
        formData,
        this.props.products.artists,
        "artist"
      );
      this.updateFields(newFormData);
    });

    this.props.dispatch(getGenres()).then(response => {
      const newFormData = populateOptions(
        formData,
        this.props.products.genres,
        "genre"
      );
      this.updateFields(newFormData);
    });
  }

  updateFields = newFormData => {
    this.setState({ formData: newFormData });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, "products");

    this.setState({
      formData: newFormData,
      formSuccess: true
    });

    setTimeout(() => {
      this.setState({ formSuccess: false }, () => {
        this.props.dispatch(clearNewProduct());
      });
    }, 3000);
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "products");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let formattedData = formatData(this.state.formData, "products");
    let isFormValid = validateForm(this.state.formData, "products");

    if (isFormValid) {
      this.props.dispatch(addProduct(formattedData)).then(() => {
        console.log(this.props.products.addedProduct);
        if (this.props.products.addedProduct.success) {
          console.log("success");
          this.resetFieldHandler();
        } else {
          console.log("not success");
          this.setState({ formError: true });
        }
      });
    } else {
      console.log("not valid");
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="add-product">
        <div className="container">
          <h4 className="pt-4 pb-3">Add Product</h4>

          <form onSubmit={event => this.submitForm(event)}>
            <div className="form-group">
              <FormField
                type="text"
                className="form-control"
                id="name"
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="form-group">
              <FormField
                type="textarea"
                className="form-control"
                id="description"
                formData={this.state.formData.description}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="form-group">
              <FormField
                type="number"
                className="form-control"
                id="price"
                formData={this.state.formData.price}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="form-group">
              <FormField
                type="text"
                className="form-control"
                id="artist"
                formData={this.state.formData.artist}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="form-group">
              <FormField
                type="text"
                className="form-control"
                id="genre"
                formData={this.state.formData.genre}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="form-group">
              {this.state.formError && <div>Please provide valid data.</div>}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
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
