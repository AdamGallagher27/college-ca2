import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import { useNavigate, useParams } from 'react-router-dom'
import { getSelectedEnrolmentShow } from '../../utilities/enrolments/enrolementsAPI'

const Show = () => {

  const { enrolmentID } = useParams()
  const navigate = useNavigate()
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [enrolment, setEnrolment] = useState([])

  useEffect(() => {
    getSelectedEnrolmentShow(enrolmentID, setEnrolment)
  }, [])

  const editEnrolment = () => {
    navigate(`/enrolments/edit/${enrolmentID}`)
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  if (enrolment.length === 0) return <>loading</>

  return (
    <>
      <div className='ml-9'>
        <div className='ml-9'>
          <div>
            <p className="py-1">Lecturer : {enrolment.lecturer.name}</p>
            <p className="py-1">Email : {enrolment.lecturer.email}</p>

            <p className="py-1">Course : {enrolment.course.title}</p>
            <p className="py-1">Description : {enrolment.course.description}</p>

            <p className="py-1">Status : {enrolment.status}</p>
            <button onClick={editEnrolment} className="btn btn-primary mt-4">Edit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show