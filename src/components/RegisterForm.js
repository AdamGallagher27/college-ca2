import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Context } from "../App"
import { formatServerErrors } from "../utilities/formatServerErrors"
import FormError from "./FormError"
import { updateForm } from "../utilities/updateForm"

const RegisterForm = ({ switchView }) => {

  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [errorMessages, setErrorMessages] = useState('')

  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "password": ""
  })

  const REGISTER_END_POINT = 'https://college-api.vercel.app/api/register'

  const handleClick = (event) => {

    event.preventDefault()

    axios.post(REGISTER_END_POINT, formData)
      .then(response => {
        checkIsAuthenicated(response)
      })
      .catch(error => {
        // console.error(error)
        setErrorMessages(formatServerErrors(error.response.data))
      })
  }

  const checkIsAuthenicated = (response) => {
    if (response.status === 200) {
      onAuthenticated(true, response.data.token)
    }
  }

  const handleForm = (event => {
    updateForm(event, setFormData)
  })

  return (
    <form className="card-body" onChange={handleForm}>
      <h2 className='text-5xl'>Register</h2>
      <p>Create an account to view college data</p>
      <p>Already have an account? <a onClick={switchView} className="link link-primary">Login</a></p>
      <div className="form-control">
        <FormError errorMessage={errorMessages.name} />
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input type="name" name="name" placeholder="name" className="input input-bordered" />
      </div>
      <div className="form-control">
        <FormError errorMessage={errorMessages.email} />
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="email" name="email" placeholder="email" className="input input-bordered" />
      </div>
      <div className="form-control">
        <FormError errorMessage={errorMessages.password} />
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" name="password" placeholder="password" className="input input-bordered" />

      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" onClick={handleClick}>Register</button>
      </div>
    </form>
  )
}

export default RegisterForm