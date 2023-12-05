
const fieldRegex = {
  "course_id": /^[0-9]+$/,
  "lecturer_id": /^[0-9-]+$/,
  "date": /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  "time": /^[a-zA-Z0-9\s.,:!?]*$/,
  "status" : /^[a-zA-Z0-9\s.,_!?]*$/
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