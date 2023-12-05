import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../App'
import { checkErrors, getErrorMessages } from '../../utilities/lecturers/lecturerValidate'
import FormError from '../../components/FormError'
import { updateForm } from '../../utilities/updateForm'
import { formatServerErrors } from '../../utilities/formatServerErrors'
import { getSelectedLecturerEdit, editLecturer } from '../../utilities/lecturers/lecturerAPI'

const Edit = () => {
  const { lecturerID } = useParams()
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    "name": "",
    "address": "",
    "email": "",
    "phone": "",
  })

  const [errorMessages, setErrorMessages] = useState({})

  useEffect(() => {
    getSelectedLecturerEdit(lecturerID, setFormData)
  }, [])

  const handleForm = (event => {
    updateForm(event, setFormData)
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (checkErrors(formData)) {
      editLecturer(lecturerID, formData, setErrorMessages)
      navigate('/lecturers?success=edit-success-lecturer')
    }
    else {
      setErrorMessages(getErrorMessages(formData))
    }
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-base-200">
      <h2 className="text-2xl font-bold mb-4">Edit Lecturer</h2>
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
            value={formData.name}
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
            value={formData.address}
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
            value={formData.phone}
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
            value={formData.email}
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