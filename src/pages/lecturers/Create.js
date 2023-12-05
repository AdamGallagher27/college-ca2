import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../App'
import { checkErrors, getErrorMessages } from '../../utilities/lecturers/lecturerValidate'
import FormError from '../../components/FormError'


const Create = () => {
  const LECTURER_API_CREATE = 'https://college-api.vercel.app/api/lecturers'
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const token = localStorage.getItem('AUTH_TOKEN')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    "name": "",
    "address": "",
    "email": "",
    "phone": "",
  })

  const [errorMessages, setErrorMessages] = useState({})

  const handleForm = (event => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  })

  const createLecturer = () => {
    axios.post(LECTURER_API_CREATE, formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        navigate('/lecturers?success=create-success')
      })
      .catch(error => {
        console.error(error)
        setErrorMessages(formatServerErrors(error.response.data.errors))
      })
  }

  const formatServerErrors = (errors) => {
    let newErrorsObject = {}
    for(const key in errors){
      newErrorsObject[key] = errors[key][0]
    }
    return newErrorsObject
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (checkErrors(formData)) {
      createLecturer()
    }
    else{
      setErrorMessages(getErrorMessages(formData))
    }
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-base-200">
      <h2 className="text-2xl font-bold mb-4">Create a Course</h2>
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