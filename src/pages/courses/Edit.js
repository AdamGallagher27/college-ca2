import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../App'
import { checkErrors, getErrorMessages } from '../../utilities/courses/courseValidate'
import FormError from '../../components/FormError'
import { updateForm } from '../../utilities/updateForm'
import { formatServerErrors } from '../../utilities/formatServerErrors'
import { getSelectedCourseEdit, editCourse } from '../../utilities/courses/courseAPI'


const Edit = () => {
  // get course id from param
  const { courseID } = useParams()

  // authentication functions from app.js context
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  // navigation function
  const navigate = useNavigate()

  // state variable to hold form data
  const [formData, setFormData] = useState({
    "title": "",
    "code": "",
    "description": "",
    "points": "",
    "level": "7"
  })

  // state variable  to hold client / server error messages
  const [errorMessages, setErrorMessages] = useState({})
  
  // on first load get selected course for edit form
  useEffect(() => {
    getSelectedCourseEdit(courseID, setFormData)
  }, [])

  // on form change update form state variable
  const handleForm = (event => {
    updateForm(event, setFormData)
  })

  // submit edit form 
  // if no client errors edit the course in the api
  // else set error messages from client validation
  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (checkErrors(formData)) {
      editCourse(courseID, formData, setErrorMessages)
      navigate('/courses?success=edit-success-course')
    }
    else{
      setErrorMessages(getErrorMessages(formData))
    }
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-base-200">
      <h2 className="text-2xl font-bold mb-4">Edit a Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormError errorMessage={errorMessages.title} />
          <label htmlFor="title" className="form-control block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleForm}
          />
        </div>

        <div className="mb-4">
        <FormError errorMessage={errorMessages.description} />
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="input input-bordered w-full"
            value={formData.description}
            onChange={handleForm}
          ></textarea>
        </div>

        <div className="mb-4">
        <FormError errorMessage={errorMessages.points} />

          <label htmlFor="points" className="block text-sm font-medium text-gray-700">
            Points
          </label>
          <input
            type="number"
            id="points"
            name="points"
            className="input input-bordered w-full"
            value={formData.points}
            onChange={handleForm}
          />
        </div>

        <div className="mb-4">
        <FormError errorMessage={errorMessages.level} />

          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Level
          </label>
          <select
            id="level"
            name="level"
            className="input input-bordered w-full"
            value={formData.level}
            onChange={handleForm}
          >
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>

        <div className="mb-4">
        <FormError errorMessage={errorMessages.code} />

          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            rows="6"
            className="input input-bordered w-full"
            value={formData.code}
            onChange={handleForm}
          ></textarea>
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