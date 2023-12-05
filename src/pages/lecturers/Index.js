import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import useNotification from '../../utilities/useNotification'
import NotificationBox from '../../components/NotificationBox'
import LecturerTable from '../../components/LecturerTable';

const Index = () => {
  const LECTURERS_API_INDEX = 'https://college-api.vercel.app/api/lecturers'
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [lecturers, setLecturers] = useState([])
  const token = localStorage.getItem('AUTH_TOKEN')
  const {visible, text, showNotification} = useNotification()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAllLecturers()

    const urlParams = new URLSearchParams(location.search);
    const successParam = urlParams.get('success');

    if (successParam === 'edit-success') {
      showNotification('successfully updated course', 1500)
      navigate('/lecturers')
    }

    if (successParam === 'create-success') {
      showNotification('successfully created course', 1500)
      navigate('/lecturers')
    }
  }, [])

  const getAllLecturers = () => {
    axios.get(LECTURERS_API_INDEX, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data.data)
        setLecturers(response.data.data)
      })
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  if (!lecturers) return <p>loading Lecturers</p>

  return (
    <>
      <h1 className='hero text-3xl'>Lecturers</h1>
      <NotificationBox visible={visible} message={text}/>
      <div className="hero px-0">
        {/* <CourseTable courses={courses} /> */}
        <LecturerTable lecturers={lecturers} />
      </div>
    </>
  )
}

export default Index