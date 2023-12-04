import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Context } from "../App"

const RegisterForm = () => {
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    "name" : "",
    "email": "",
    "password": ""
  })

  const REGISTER_END_POINT = 'https://college-api.vercel.app/api/register'

  const handleClick = (event) => {

    event.preventDefault()

    axios.post(REGISTER_END_POINT, formData)
      .then(response => {
        console.log(response)
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
    <div>
      <form onChange={handleForm}>
        name : <input type='text' name="name" value={formData.name} />
        email : <input type='text' name="email" value={formData.email} />
        password : <input type='text' name="password" value={formData.password} />
        <button onClick={handleClick}>login</button>
        {error ? error : ''}
      </form>
    </div>
  )
}

export default RegisterForm