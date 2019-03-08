export const validate = (element, formData = []) => {
  let error = [true, ""];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "Please enter a valid email." : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    const message = `${!valid ? "Passwords do not match." : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required." : ""}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (element, formData, formName) => {
  const newFormData = {
    ...formData
  };

  const newElement = {
    ...newFormData[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormData[element.id] = newElement;

  return newFormData;
};

export const formatData = (formData, formName) => {
  let formattedData = {};

  for (let key in formData) {
    if (key !== "password2") {
      formattedData[key] = formData[key].value;
    }
  }

  return formattedData;
};

export const validateForm = (formData, formName) => {
  let isFormValid = true;

  for (let key in formData) {
    isFormValid = formData[key].valid && isFormValid;
  }

  return isFormValid;
};
