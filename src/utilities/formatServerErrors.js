// format server errors for form error components
const formatServerErrors = (errors) => {
  let newErrorsObject = {}
  for (const key in errors) {
    newErrorsObject[key] = errors[key][0]
  }

  return newErrorsObject
}


export { formatServerErrors }