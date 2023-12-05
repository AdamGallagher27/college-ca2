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
  const { courseID } = useParams()
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    "title": "",
    "code": "",
    "description": "",
    "points": "",
    "level": "7"
  })

  const [errorMessages, setErrorMessages] = useState({})
  
  useEffect(() => {
    getSelectedCourseEdit(courseID, setFormData)
  }, [])

  const handleForm = (event => {
    updateForm(event, setFormData)
  })

  
  const handleSubmit = (event) => {
    console.log(formData)
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