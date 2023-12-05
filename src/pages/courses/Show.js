import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { getSelectedCourseShow } from '../../utilities/courses/courseAPI'

const Show = () => {
  const { courseID } = useParams()
  const navigate = useNavigate()
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [course, setCourse] = useState([])

  useEffect(() => {
    getSelectedCourseShow(courseID, setCourse)
  }, [])

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
            <p className="py-1">Level : {course.level}</p>
            <button onClick={editCourse} className="btn btn-primary mt-4">Edit</button>
          </div>
        </div>
      </div>

      {!course.enrolments ? '' : <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-3xl mb-4 font-bold">Enrolments</h1>
            <p>{course.enrolments ? JSON.stringify(course.enrolments) : ''}</p>
            <button className="btn btn-primary mt-4">Edit</button>
          </div>
        </div>
      </div>}
    </>

  )
}

export default Show