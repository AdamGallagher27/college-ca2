
const catchSuccessParam = (successParam) => {
  
  if (successParam === 'edit-success-course') {
    return 'successfully updated course'
  }
  
  if (successParam === 'create-success-course') {
    return 'successfully created course'
  }

  if (successParam === 'edit-success-lecturer') {
    return 'successfully updated lecturer'
  }
  
  if (successParam === 'create-success-lecturer') {
    return 'successfully created lecturer'
  }

  if(successParam === 'create-success-enrolment') {
    return 'successfully created an enrolment'
  }

  if(successParam === 'edit-success-enrolment') {
    return 'successfully edited an enrolment'
  }
}


export {catchSuccessParam}