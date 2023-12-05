import axios from 'axios'
import { formatServerErrors } from '../../utilities/formatServerErrors'

const COLLEGE_API_INDEX = 'https://college-api.vercel.app/api/courses'
const COLLEGE_API_SHOW = `https://college-api.vercel.app/api/courses/`
const COLLEGE_API_CREATE = 'https://college-api.vercel.app/api/courses'
const COLLEGE_API_EDIT = `https://college-api.vercel.app/api/courses/`
const token = localStorage.getItem('AUTH_TOKEN')


const getAllCourses = (courseSetter) => {
  axios.get(COLLEGE_API_INDEX, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      courseSetter(response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

const getSelectedCourseShow = (courseID, courseSetter) => {
  axios.get(COLLEGE_API_SHOW + courseID, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      courseSetter(response.data.data)
    })
    .catch(error => {
      console.error(error)
    })
}

const getSelectedCourseEdit = (courseID, formSetter) => {
  axios.get(COLLEGE_API_SHOW + courseID, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
    .then((response) => {
      const { title, code, description, points, level } = response.data.data
      formSetter({ title, code, description, points, level })
    })
    .catch(error => {
      console.error(error)
    })
}

const editCourse = (courseID, formData, errorSetter) => {
  axios.put(COLLEGE_API_EDIT + courseID, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.error(error)
      errorSetter(formatServerErrors(error.response.data.errors))
    })
}

const createCourse = (formData, errorSetter) => {
  axios.post(COLLEGE_API_CREATE, formData, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .catch(error => {
      errorSetter(formatServerErrors(error.response.data.errors))
    })
}


const getCourseTitles = (courseSetter) => {
  axios.get(COLLEGE_API_INDEX, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      courseSetter(response.data.data.map(course => {
        return {"title" : course.title, "id" : course.id}
      }))
    })
    .catch(error => {
      console.error(error)
    })
}


export { getAllCourses, getSelectedCourseShow, getSelectedCourseEdit, editCourse, createCourse, getCourseTitles }