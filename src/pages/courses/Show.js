import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import { useNavigate, useParams } from 'react-router-dom'
import { getSelectedCourseShow } from '../../utilities/courses/courseAPI'
import EnrolmentCard from '../../components/EnrolmentCard'

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

  const enrolmentCards = !course.enrolments ? '':  course.enrolments.map((enrolment, index) => {
    return <EnrolmentCard key={index} enrolment={enrolment} />
  })

  if (!isAuthenticated) return <>you must be authenticated</>

  if (course.length === 0) return <>loading</>
  return (
    <>
      <div className='ml-9'>
        <div className='ml-9'>
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

      {course.enrolments.length === 0 ? '' : <div className='ml-9 mt-9'>
        <div className='ml-9'>
          <div>
            <h1 className="text-3xl mb-4 font-bold">Enrolments</h1>
            {enrolmentCards}
          </div>
        </div>
      </div>}
    </>

  )
}

export default Show