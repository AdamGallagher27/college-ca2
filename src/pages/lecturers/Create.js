import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../App'
import { checkErrors, getErrorMessages } from '../../utilities/lecturers/lecturerValidate'
import FormError from '../../components/FormError'
import { updateForm } from '../../utilities/updateForm'
import { createLecturer } from '../../utilities/lecturers/lecturerAPI'

const Create = () => {
  
  // authentication functions from app.js context
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  // function for navigation
  const navigate = useNavigate()

  // state variable for form data
  const [formData, setFormData] = useState({
    "name": "",
    "address": "",
    "email": "",
    "phone": "",
  })

  // state variable to hold client / server error messages
  const [errorMessages, setErrorMessages] = useState({})

  // update form state variable when form changes
  const handleForm = (event => {
    updateForm(event, setFormData)
  })

  // if there is no client errors make create request to api
  // other wise set error messages
  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (checkErrors(formData)) {
      createLecturer(formData, setErrorMessages)
      navigate('/lecturers?success=create-success-lecturer')
    }
    else{
      setErrorMessages(getErrorMessages(formData))
    }
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-base-200">
      <h2 className="text-2xl font-bold mb-4">Create a Lecturer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormError errorMessage={errorMessages.name} />
          <label htmlFor="name" className="form-control block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full"
            onChange={handleForm}
          />
        </div>

        <div className="mb-4">
        <FormError errorMessage={errorMessages.address} />
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            className="input input-bordered w-full"
            onChange={handleForm}
          ></textarea>
        </div>

        <div className="mb-4">
        <FormError errorMessage={errorMessages.phone} />

          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="input input-bordered w-full"
            onChange={handleForm}
          />
        </div>
        <div className="mb-4">
        <FormError errorMessage={errorMessages.email} />
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <textarea
            id="email"
            name="email"
            rows="6"
            className="input input-bordered w-full"
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

export default Create