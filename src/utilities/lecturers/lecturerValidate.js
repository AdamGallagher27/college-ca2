
const fieldRegex = {
  "name": /^[a-zA-Z0-9\s]+$/,
  "address": /^[a-zA-Z0-9\s.,!?]*$/,
  "phone": /^[0-9-]+$/,
  "email": /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
}

const getErrorMessages = (formData) => {
  let errorMessages = {}

  for (const key in formData) {

    // compare the field to its regex
    if (!fieldRegex[key].test(formData[key])) {
      errorMessages[key] = `invalid ${key} field`
    }
  }

  // check if the fields are empty
  for (const key in formData) {
    if (formData[key].length === 0) {
      errorMessages[key] = `${key} field is required`
    }
  }

  return errorMessages
}

const checkErrors = (formData) => {
  return Object.keys(getErrorMessages(formData)).length === 0
}

export { checkErrors, getErrorMessages }