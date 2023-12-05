import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../App'
import { getErrorMessages, checkErrors } from '../../utilities/enrolments/enrolmentValidate'
import FormError from '../../components/FormError'
import { updateForm } from '../../utilities/updateForm'
import { createEnrolment, editEnrolment, getSelectedEnrolmentEdit } from '../../utilities/enrolments/enrolementsAPI'
import { getCourseTitles } from '../../utilities/courses/courseAPI'
import { getLecturerNames } from '../../utilities/lecturers/lecturerAPI'

const Edit = () => {

  const { enrolmentID } = useParams()
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const navigate = useNavigate()

  const [lecturerNames, setLecturerNames] = useState([])
  const [courseNames, setCourseNames] = useState([])

  const [formData, setFormData] = useState({
    "course_id": "11",
    "lecturer_id": "11",
    "date": "",
    "time": "",
    "status": "interested"
  })

  const [errorMessages, setErrorMessages] = useState({})

  useEffect(() => {
    getSelectedEnrolmentEdit(enrolmentID, setFormData)
    getLecturerNames(setLecturerNames)
    getCourseTitles(setCourseNames)
  }, [])

  const handleForm = (event => {
    updateForm(event, setFormData)
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (checkErrors(formData)) {
      editEnrolment(enrolmentID, formData, setErrorMessages)
      navigate('/enrolments?success=edit-success-enrolment')
    }
    else {
      setErrorMessages(getErrorMessages(formData))
    }
  }

  const lecturerDropDownOptions = !lecturerNames ? '' : lecturerNames.map((lecturer, index) => {
    return <option value={lecturer.id} key={index}>{lecturer.name}</option>
  })

  const courseDropDownOptions = !courseNames ? '' : courseNames.map((course, index) => {
    return <option value={course.id} key={index}>{course.title}</option>
  })

  if (!isAuthenticated) return <>you must be authenticated</>
  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-base-200">
      <h2 className="text-2xl font-bold mb-4">Create an Enrolment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormError errorMessage={errorMessages.lecturer_id} />
          <label htmlFor="lecturer_id" className="block text-sm font-medium text-gray-700">
            Lecturer
          </label>
          <select
            id="lecturer_id"
            name="lecturer_id"
            className="input input-bordered w-full"
            value={formData.lecturer_id}
            onChange={handleForm}
          >
            {lecturerDropDownOptions}
          </select>
        </div>
        <div className="mb-4">
          <FormError errorMessage={errorMessages.course_id} />
          <label htmlFor="course_id" className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <select
            id="course_id"
            name="course_id"
            className="input input-bordered w-full"
            value={formData.course_id}
            onChange={handleForm}
          >
            {courseDropDownOptions}
          </select>
        </div>

        <div className="mb-4">
          <FormError errorMessage={errorMessages.time} />

          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type='time'
            id="time"
            name="time"
            rows="6"
            className="input input-bordered w-full"
            value={formData.time}
            onChange={handleForm}
          ></input>
        </div>

        <div className="mb-4">
          <FormError errorMessage={errorMessages.date} />

          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type='date'
            id="date"
            name="date"
            rows="6"
            className="input input-bordered w-full"
            value={formData.date}
            onChange={handleForm}
          ></input>
        </div>

        <div className="mb-4">
          <FormError errorMessage={errorMessages.status} />
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="input input-bordered w-full"
            value={formData.status}
            onChange={handleForm}
          >
            <option value='interested'>interested</option>
            <option value='assigned'>assigned</option>
            <option value='associate'>associate</option>
            <option value='career_break'>career_break</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Edit