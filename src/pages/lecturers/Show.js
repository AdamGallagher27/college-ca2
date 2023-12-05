import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const Show = () => {
  const { lecturerID } = useParams()
  const navigate = useNavigate()
  const LECTURER_API_SHOW = `https://college-api.vercel.app/api/lecturers/${lecturerID}`
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [lecturer, setLecturer] = useState([])
  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect(() => {
    getSelectedLecturer()
  }, [])

  const getSelectedLecturer = () => {
    axios.get(LECTURER_API_SHOW, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data.data)
        setLecturer(response.data.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

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