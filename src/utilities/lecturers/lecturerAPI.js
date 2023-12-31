import axios from "axios"
import { formatServerErrors } from '../../utilities/formatServerErrors'


const LECTURERS_API_INDEX = 'https://college-api.vercel.app/api/lecturers'
const LECTURERS_API_SHOW = 'https://college-api.vercel.app/api/lecturers/'
const LECTURERS_API_EDIT = 'https://college-api.vercel.app/api/lecturers/'
const LECTURERS_API_CREATE = 'https://college-api.vercel.app/api/lecturers/'
const LECTURERS_API_DELETE = 'https://college-api.vercel.app/api/lecturers/'
const ENROLMENTS_API_DELETE = 'https://college-api.vercel.app/api/enrolments/'


const token = localStorage.getItem('AUTH_TOKEN')


// get every lecturer
const getAllLecturers = (lecturerSetter) => {
  axios.get(LECTURERS_API_INDEX, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      // console.log(response.data.data)
      lecturerSetter(response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

// get the selected lecturer for show view
const getSelectedLecturerShow = (lecturerID, lecturerSetter) => {
  axios.get(LECTURERS_API_SHOW + lecturerID, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      lecturerSetter(response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

// get the selected lecturer for edit form
const getSelectedLecturerEdit = (lecturerID, formSetter) => {
  axios.get(LECTURERS_API_SHOW + lecturerID, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
    .then((response) => {
      const { name, address, email, phone } = response.data.data
      formSetter({ name, address, email, phone })
    })
    .catch(error => {
      console.error(error)
    })
}

// edit lecturer
const editLecturer = (lecturerID, formData, errorSetter) => {
  axios.put(LECTURERS_API_EDIT + lecturerID, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
    .catch(error => {
      errorSetter(formatServerErrors(error.response.data.errors))
    })
}

// create a lecturer
const createLecturer = (formData, errorSetter) => {
  axios.post(LECTURERS_API_CREATE, formData, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .catch(error => {
      console.error(error)
      errorSetter(formatServerErrors(error.response.data.errors))
    })
}

// get lecturer names / id for drop down
const getLecturerNames = (lecturerSetter) => {
  axios.get(LECTURERS_API_INDEX, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      lecturerSetter(response.data.data.map(lecturer => {
        return { "name": lecturer.name, "id": lecturer.id }
      }))
    })
    .catch(error => {
      console.error(error)
    })
}

// delete lecturers enrolments
const deleteLecturerEnrolments = (lecturer) => {
  lecturer.enrolments.forEach((enrolment) => {
    axios.delete(ENROLMENTS_API_DELETE + enrolment.id, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .catch((error) => {
        console.log(error);
      });
  })
}

// delete lecturer
const deleteLecturer = (lecturer) => {
  deleteLecturerEnrolments(lecturer)
  axios.delete(LECTURERS_API_DELETE + lecturer.id, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .catch((error) => {
      console.log(error);
    });
}

export { getAllLecturers, getSelectedLecturerShow, getSelectedLecturerEdit, editLecturer, createLecturer, getLecturerNames, deleteLecturer }