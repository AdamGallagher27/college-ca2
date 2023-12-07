import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCourse, getSelectedCourseShow } from '../../utilities/courses/courseAPI'
import EnrolmentCard from '../../components/EnrolmentCard'
import DeleteButton from '../../components/DeleteButton'

const Show = () => {
  // course id from url 
  const { courseID } = useParams()

  // function to handle navigation
  const navigate = useNavigate()

  // authentication code from app.js context
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  // state variable to hold coures
  const [course, setCourse] = useState([])

  // on first load get the selected coures
  useEffect(() => {
    getSelectedCourseShow(courseID, setCourse)
  }, [])

  // navigate to the edit coures form
  const editCourse = () => {
    navigate(`/courses/edit/${courseID}`)
  }

  // delete helper method
  const deleteMethod = () => {
    deleteCourse(course)
    navigate('/courses?success=delete-success-course')
  }

  const enrolmentCards = !course.enrolments ? '':  course.enrolments.map((enrolment, index) => {
    return <EnrolmentCard key={index} name={enrolment.lecturer.name} />
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
            <div className='flex gap-4 align-middle	pt-4'>
            <button onClick={editCourse} className="btn btn-primary">Edit</button>
            <DeleteButton buttonText='Delete Course' deleteMethod={deleteMethod} />
            
            </div>
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