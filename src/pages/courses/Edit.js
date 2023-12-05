import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../App'
import { checkErrors, getErrorMessages } from '../../utilities/courses/courseValidate'
import FormError from '../../components/FormError'


const Edit = () => {
  const { courseID } = useParams()
  const COLLEGE_API_EDIT = `https://college-api.vercel.app/api/courses/${courseID}`
  const COLLEGE_API_SHOW = `https://college-api.vercel.app/api/courses/${courseID}`
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const token = localStorage.getItem('AUTH_TOKEN')
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
    getSelectedCourse()
  }, [])

  const getSelectedCourse = () => {
    axios.get(COLLEGE_API_SHOW, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((response) => {
        const {title, code, description, points, level} = response.data.data
        setFormData({title, code, description, points, level})
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleForm = (event => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  })

  const editCourse = () => {
    axios.put(COLLEGE_API_EDIT, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(response => {
        navigate('/courses?success=edit-success')
      })
      .catch(error => {
        // console.error(error)
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
      editCourse()
    }
    else{
      setErrorMessages(getErrorMessages(formData))
    }
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  return (
    // <form onSubmit={handleSubmit}>
    //   {errorMessages.title ? <div>{errorMessages.title}</div> : ''}
    //   <label htmlFor="title">Title:</label>
    //   <input
    //     type="text"
    //     id="title"
    //     name="title"
    //     value={formData.title}
    //     onChange={handleForm}

    //   />

    //   {errorMessages.code ? <div>{errorMessages.code}</div> : ''}
    //   <label htmlFor="code">Code:</label>
    //   <input
    //     type="text"
    //     id="code"
    //     name="code"
    //     value={formData.code}
    //     onChange={handleForm}

    //   />

    //   {errorMessages.description ? <div>{errorMessages.description}</div> : ''}
    //   <label htmlFor="description">Description:</label>
    //   <textarea
    //     id="description"
    //     name="description"
    //     value={formData.description}
    //     onChange={handleForm}
    //     rows="4"

    //   ></textarea>

    //   {errorMessages.points ? <div>{errorMessages.points}</div> : ''}
    //   <label htmlFor="points">Points:</label>
    //   <input
    //     type="number"
    //     id="points"
    //     name="points"
    //     value={formData.points}
    //     onChange={handleForm}

    //   />

    //   {errorMessages.level ? <div>{errorMessages.level}</div> : ''}
    //   <label htmlFor="level">Level:</label>
    //   <select
    //     id="level"
    //     name="level"
    //     value={formData.level}
    //     onChange={handleForm}

    //   >
    //     <option value="7">7</option>
    //     <option value="8">8</option>
    //     <option value="9">9</option>
    //   </select>

    //   <button type="submit">Submit</button>
    // </form>

    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-base-200">
      <h2 className="text-2xl font-bold mb-4">Create a Course</h2>
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