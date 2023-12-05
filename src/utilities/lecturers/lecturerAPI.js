import axios from "axios"
import { formatServerErrors } from '../../utilities/formatServerErrors'


const LECTURERS_API_INDEX = 'https://college-api.vercel.app/api/lecturers'
const LECTURERS_API_SHOW = 'https://college-api.vercel.app/api/lecturers/'
const LECTURERS_API_EDIT = 'https://college-api.vercel.app/api/lecturers/'
const LECTURERS_API_CREATE = 'https://college-api.vercel.app/api/lecturers/'

const token = localStorage.getItem('AUTH_TOKEN')


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


export { getAllLecturers, getSelectedLecturerShow, getSelectedLecturerEdit, editLecturer, createLecturer }