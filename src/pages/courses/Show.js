import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Show = () => {
  const { courseID } = useParams()
  const navigate = useNavigate()
  const COLLEGE_API_SHOW = `https://college-api.vercel.app/api/courses/${courseID}`
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [course, setCourse] = useState([])
  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect(() => {
    getSelectedCourse()
  }, [])

  const getSelectedCourse = () => {
    axios.get(COLLEGE_API_SHOW, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data.data)
        setCourse(response.data.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const editCourse = () => {
    navigate(`/courses/edit/${courseID}`)
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  if(course.length === 0) return <>loading</>
  return (
    <>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-5xl mb-4 font-bold">{course.title}</h1>
            <p className="py-1">Description : {course.description}</p>
            <p className="py-1">Code : {course.code}</p>
            <p className="py-1">Points : {course.points}</p>
            <p className="py-1">Code : {course.code}</p>
            <p className="py-1">Level : {course.level}</p>
            <button onClick={editCourse} className="btn btn-primary mt-4">Edit</button>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-3xl mb-4 font-bold">Enrolments</h1>
            <p>{course.enrolments ? JSON.stringify(course.enrolments) : ''}</p>
            <button className="btn btn-primary mt-4">Edit</button>
          </div>
        </div>
      </div>
        
    </>

  )
}

export default Show