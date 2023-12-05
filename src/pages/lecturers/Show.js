import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { getSelectedLecturerShow } from '../../utilities/lecturers/lecturerAPI'

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
            <button onClick={editLecturer} className="btn btn-primary mt-4 mb-4">Edit</button>
          </div>
        </div>
      </div>

      {lecturer.enrolments.length === 0 ? '' : <div className='ml-9'>
        <div className='ml-9'>
          <div>
            <h1 className="text-3xl mb-4 font-bold">Enrolments</h1>
            <p>{lecturer.enrolments ? JSON.stringify(lecturer.enrolments) : ''}</p>
            <button className="btn btn-primary mt-4">Edit</button>
          </div>
        </div>
      </div>}

    </>

  )
}

export default Show