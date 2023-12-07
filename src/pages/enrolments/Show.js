import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteEnrolment, getSelectedEnrolmentShow } from '../../utilities/enrolments/enrolementsAPI'
import DeleteButton from '../../components/DeleteButton'

const Show = () => {

  // enrolment id from url
  const { enrolmentID } = useParams()

  // state variable for selected enrolment 
  const [enrolment, setEnrolment] = useState([])

  // function to handle navigation
  const navigate = useNavigate()

  // authentication functions from app.js context
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  // on first load get selected enrolment
  useEffect(() => {
    getSelectedEnrolmentShow(enrolmentID, setEnrolment)
  }, [])

  // navigate to edit enrolment form
  const editEnrolment = () => {
    navigate(`/enrolments/edit/${enrolmentID}`)
  }

  // delete helper method
  const deleteMethod = ()=> {
    deleteEnrolment(enrolment)
    navigate('/enrolments?success=delete-success-enrolment')
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
            <div className='flex gap-4 align-middle	pt-4'>
            <button onClick={editEnrolment} className="btn btn-primary">Edit</button>
            <DeleteButton buttonText='Delete Enrolment' deleteMethod={deleteMethod} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show