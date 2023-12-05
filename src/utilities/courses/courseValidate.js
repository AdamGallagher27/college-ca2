
const fieldRegex = {
  "title": /^[a-zA-Z0-9\s]+$/,
  "code": /^[a-zA-Z0-9\s]+$/,
  "description": /^[a-zA-Z0-9\s.,!?]*$/,
  "points": /^(?!99$)[1-9]\d*$/,
  "level": /^[1-9]\d*$/
}

const getErrorMessages = (formData) => {
  const possibleLevels = ["7", "8", "9", 7, 8, 9]
  let errorMessages = {}

  for (const key in formData) {

    // compare the field to its regex
    if (!fieldRegex[key].test(formData[key])) {
      errorMessages[key] = `invalid ${key} field`
    }
  }

  // check that the level given is correct
  if (!possibleLevels.includes(formData.level)) {
    errorMessages.level = 'invalid level'
  }

  if (formData.points < 100) {
    errorMessages.points = 'points must be greater than 100'
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