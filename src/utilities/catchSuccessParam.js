
const catchSuccessParam = (successParam) => {

  if (successParam === 'edit-success-course') {
    return 'successfully updated course'
  }

  if (successParam === 'create-success-course') {
    return 'successfully created course'
  }

  if (successParam === 'delete-success-course') {
    return 'successfully deleted course'
  }

  if (successParam === 'edit-success-lecturer') {
    return 'successfully updated lecturer'
  }

  if (successParam === 'create-success-lecturer') {
    return 'successfully created lecturer'
  }

  if (successParam === 'delete-success-lecturer') {
    return 'successfully deleted lecturer'
  }

  if (successParam === 'create-success-enrolment') {
    return 'successfully created an enrolment'
  }

  if (successParam === 'edit-success-enrolment') {
    return 'successfully edited an enrolment'
  }

  if (successParam === 'delete-success-enrolment') {
    return 'successfully deleted an enrolment'
  }
}


export { catchSuccessParam }