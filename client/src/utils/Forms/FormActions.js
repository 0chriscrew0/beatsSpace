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

export const populateOptions = (formData, array = [], field) => {
  const newArray = [];
  const newFormData = { ...formData };

  array.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });

  newFormData[field].config.options = newArray;
  return newFormData;
};

export const resetFields = (formData, formName) => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    newFormData[key].value = "";
    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = "";

    return newFormData;
  }
};
