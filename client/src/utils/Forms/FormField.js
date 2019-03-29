import React from "react";

const FormField = ({ formData, change, id }) => {
  const showError = () => {
    let errorMesage = null;

    if (formData.validation && !formData.valid) {
      errorMesage = <div>{formData.validationMessage}</div>;
    }

    return errorMesage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case "input":
        formTemplate = (
          <div>
            <input
              className="form-control my-3"
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div>
            <textarea
              className="form-control my-3"
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />

            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div>
            <select
              className="form-control my-3"
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            >
              <option value="">Select One</option>
              {formData.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
