import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteLecturer, getSelectedLecturerShow } from '../../utilities/lecturers/lecturerAPI'
import DeleteButton from '../../components/DeleteButton'
import EnrolmentCard from '../../components/EnrolmentCard'

const Show = () => {
  const { lecturerID } = useParams()
  const navigate = useNavigate()
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [lecturer, setLecturer] = useState([])

  useEffect(() => {
    getSelectedLecturerShow(lecturerID, setLecturer)
  }, [])

  const editLecturer = () => {
    navigate(`/lecturers/edit/${lecturerID}`)
  }

  const deleteMethod = () => {
    deleteLecturer(lecturer)
    navigate('/lecturers?success=delete-success-lecturer')
  }

  const enrolmentCards = !lecturer.enrolments ? '':  lecturer.enrolments.map((enrolment, index) => {
    return <EnrolmentCard key={index} name={enrolment.course.title} />
  })

  if (!isAuthenticated) return <>you must be authenticated</>

  if (lecturer.length === 0) return <>loading</>

  return (
    <>
      <div className='ml-9'>
        <div className='ml-9'>
          <div>
            <h1 className="text-5xl mb-4 font-bold">{lecturer.name}</h1>
            <p className="py-1">Address : {lecturer.address}</p>
            <p className="py-1">Phone : {lecturer.email}</p>
            <div className='flex gap-4 align-middle	pt-4'>
            <button onClick={editLecturer} className="btn btn-primary">Edit</button>
            <DeleteButton buttonText='Delete Lecturer' deleteMethod={deleteMethod} />
            </div>
          </div>
        </div>
      </div>

      {lecturer.enrolments.length === 0 ? '' : <div className='ml-9 mt-9'>
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