import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Context } from "../App"
import { useNavigate } from "react-router-dom"


const LoginForm = ({switchView}) => {

  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    "email": "",
    "password": ""
  })

  const LOGIN_END_POINT = 'https://college-api.vercel.app/api/login'

  const handleClick = (event) => {

    event.preventDefault()

    axios.post(LOGIN_END_POINT, formData)
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
    // <div>
    //   <form onChange={handleForm}>
    //     email : <input type='text' name="email" value={formData.email} />
    //     password : <input type='text' name="password" value={formData.password} />
    //     <button onClick={handleClick}>login</button>
    //     {error ? error : ''}
    //   </form>
    // </div>

  
    <form onChange={handleForm} className="card-body">
    <h2 className='text-5xl'>Login</h2>
    <p>Login to view college data</p>
    <p>New user? <a onClick={switchView} className="link link-primary">Register</a></p>
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
      <button className="btn btn-primary" onClick={handleClick}>Login</button>
    </div>
  </form>
  )
}

export default LoginForm