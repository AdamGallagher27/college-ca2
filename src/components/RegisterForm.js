import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Context } from "../App"

const RegisterForm = ({switchView}) => {
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  const [error, setError] = useState('')

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
        handleError(error)
      })
  }

  const checkIsAuthenicated = (response) => {
    if (response.status === 200) {
      onAuthenticated(true, response.data.token)
    }
  }

  const handleError = (error) => {
    if (error.response.status === 401) {
      setError('Unauthorized')
    }
  }

  const handleForm = (event => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  })

  return (
    <form className="card-body" onChange={handleForm}>
      <h2 className='text-5xl'>Register</h2>
      <p>Create an account to view college data</p>
      <p>Already have an account? <a onClick={switchView} className="link link-primary">Login</a></p>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input type="name" name="name" placeholder="name" className="input input-bordered" />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="email" name="email" placeholder="email" className="input input-bordered" />
      </div>
      <div className="form-control">
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