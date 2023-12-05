import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import axios from 'axios'
import NavBar from '../../components/NavBar'
import CourseTable from '../../components/CourseTable'
import { useLocation, useNavigate } from 'react-router-dom';
import useNotification from '../../utilities/useNotification'
import NotificationBox from '../../components/NotificationBox'

const Index = () => {

  const COLLEGE_API_INDEX = 'https://college-api.vercel.app/api/courses'
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [courses, setCourses] = useState([])
  const token = localStorage.getItem('AUTH_TOKEN')
  const {visible, text, showNotification} = useNotification()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses()

    const urlParams = new URLSearchParams(location.search);
    const successParam = urlParams.get('success');

    if (successParam === 'edit-success') {
      showNotification('successfully updated course', 1500)
      navigate('/courses')
    }

    if (successParam === 'create-success') {
      showNotification('successfully created course', 1500)
      navigate('/courses')
    }
  }, [])

  const getAllCourses = () => {
    axios.get(COLLEGE_API_INDEX, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        // console.log(response.data.data)
        setCourses(response.data.data)
      })
  }

  if (!isAuthenticated) return <>you must be authenticated</>

  if (!courses) return <p>loading courses</p>

  return (
    <>
      <h1 className='hero text-3xl'>Courses</h1>
      <NotificationBox visible={visible} message={text}/>
      <div className="hero px-0">
        <CourseTable courses={courses} />
      </div>
    </>
  )
}

export default Index