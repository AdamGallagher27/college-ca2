const updateForm = (event, formSetter) => {
  formSetter(prevState => ({
    ...prevState,
    [event.target.name]: event.target.value
  }))
}

export {updateForm}