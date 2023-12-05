import axios from "axios";
import { formatServerErrors } from '../../utilities/formatServerErrors'

const ENROLMENTS_API_INDEX = 'https://college-api.vercel.app/api/enrolments'
const ENROLMENTS_API_SHOW = 'https://college-api.vercel.app/api/enrolments/'
const ENROLMENTS_API_CREATE = 'https://college-api.vercel.app/api/enrolments/'
const ENROLMENTS_API_EDIT = 'https://college-api.vercel.app/api/enrolments/'


const token = localStorage.getItem('AUTH_TOKEN')

const getAllEnrolments = (enrolmentsSetter) => {
  axios.get(ENROLMENTS_API_INDEX, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      enrolmentsSetter(response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

const getSelectedEnrolmentShow = (enrolmentID, enrolmentSetter) => {
  axios.get(ENROLMENTS_API_SHOW + enrolmentID, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      enrolmentSetter(response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

const getSelectedEnrolmentEdit = (enrolmentID, formSetter) => {
  axios.get(ENROLMENTS_API_SHOW + enrolmentID, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
    .then((response) => {
      const { course_id, lecturer_id, date, time, status } = response.data.data
      formSetter({ course_id, lecturer_id, date, time, status })
    })
    .catch(error => {
      console.error(error)
    })
}

const createEnrolment = (formData, errorSetter) => {
  axios.post(ENROLMENTS_API_CREATE, formData, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .catch(error => {
      errorSetter(formatServerErrors(error.response.data.errors))
    })
}

const editEnrolment = (enrolmentID, formData, errorSetter) => {
  axios.put(ENROLMENTS_API_EDIT + enrolmentID, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })

    .catch(error => {
      console.error(error)
      errorSetter(formatServerErrors(error.response.data.errors))
    })
}


export { getAllEnrolments, getSelectedEnrolmentShow, createEnrolment, getSelectedEnrolmentEdit, editEnrolment }