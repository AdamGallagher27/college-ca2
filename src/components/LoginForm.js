import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Context } from "../App"
import { useNavigate } from "react-router-dom"
import { formatServerErrors } from "../utilities/formatServerErrors"
import FormError from "./FormError"
import { updateForm } from "../utilities/updateForm"

const LoginForm = ({ switchView }) => {

  // navigate function
  const navigate = useNavigate()

  // authentication functions from app.js context
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  // variable to hold error messages which get set from server errors
  const [errorMessages, setErrorMessages] = useState('')

  // form state variable
  const [formData, setFormData] = useState({
    "email": "",
    "password": ""
  })

  const LOGIN_END_POINT = 'https://college-api.vercel.app/api/login'


  // on click make login request to api
  // if successful authenticate the user 
  // if unsuccesful set errro messages
  const handleClick = (event) => {

    event.preventDefault()

    axios.post(LOGIN_END_POINT, formData)
      .then(response => {
        checkIsAuthenicated(response)
      })
      .catch(error => {
        setErrorMessages(formatServerErrors(error.response.data.error))
      })
  }

  // check if the user was authenticated 
  const checkIsAuthenicated = (response) => {
    if (response.status === 200) {
      onAuthenticated(true, response.data.token)
    }
  }

  // form handler function
  const handleForm = (event => {
    updateForm(event, setFormData)
  })

  return (
    <form onChange={handleForm} className="card-body">
      <h2 className='text-5xl'>Login</h2>
      <p>Login to your account view college data</p>
      <p>New user? <a onClick={switchView} className="link link-primary">Register</a></p>
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
        <button className="btn btn-primary" onClick={handleClick}>Login</button>
      </div>
    </form>
  )
}

export default LoginForm