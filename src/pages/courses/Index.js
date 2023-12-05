import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import NavBar from '../../components/NavBar'
import CourseTable from '../../components/CourseTable'
import { useLocation, useNavigate } from 'react-router-dom';
import useNotification from '../../utilities/useNotification'
import NotificationBox from '../../components/NotificationBox'
import { catchSuccessParam } from '../../utilities/catchSuccessParam'
import { getAllCourses } from '../../utilities/courses/courseAPI'

const Index = () => {

  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [courses, setCourses] = useState([])
  const {visible, text, showNotification} = useNotification()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses(setCourses)

    const urlParams = new URLSearchParams(location.search);
    const successParam = urlParams.get('success');

    if (successParam) {
      showNotification(catchSuccessParam(successParam), 1500)
      navigate('/courses')
    }
  }, [isAuthenticated])

  
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