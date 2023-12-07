import axios from 'axios'
import { formatServerErrors } from '../../utilities/formatServerErrors'

const COLLEGE_API_INDEX = 'https://college-api.vercel.app/api/courses'
const COLLEGE_API_SHOW = `https://college-api.vercel.app/api/courses/`
const COLLEGE_API_CREATE = 'https://college-api.vercel.app/api/courses'
const COLLEGE_API_EDIT = `https://college-api.vercel.app/api/courses/`
const COLLEGE_API_DELETE = `https://college-api.vercel.app/api/courses/`
const ENROLMENTS_API_DELETE = 'https://college-api.vercel.app/api/enrolments/'
const token = localStorage.getItem('AUTH_TOKEN')

// get all courses
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

// get the selcted course for show view
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

// get selected course for edit form
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


// edit course
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

// create a new course
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

// get course titles / ids for drop down
const getCourseTitles = (courseSetter) => {
  axios.get(COLLEGE_API_INDEX, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
      courseSetter(response.data.data.map(course => {
        return { "title": course.title, "id": course.id }
      }))
    })
    .catch(error => {
      console.error(error)
    })
}

// delete course enrolments
const deleteCourseEnrolments = (course) => {
  course.enrolments.forEach((enrolment) => {
    axios.delete(ENROLMENTS_API_DELETE + enrolment.id, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .catch((error) => {
        console.log(error);
      });
  })
}

// delete the coures
const deleteCourse = (course) => {
  deleteCourseEnrolments(course)
  axios.delete(COLLEGE_API_DELETE + course.id, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .catch((error) => {
    console.log(error);
  });
}

export { getAllCourses, getSelectedCourseShow, getSelectedCourseEdit, editCourse, createCourse, getCourseTitles, deleteCourse }