import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import CourseTable from '../../components/CourseTable'
import { useLocation, useNavigate } from 'react-router-dom';
import useNotification from '../../utilities/useNotification'
import NotificationBox from '../../components/NotificationBox'
import { catchSuccessParam } from '../../utilities/catchSuccessParam'
import { getAllCourses } from '../../utilities/courses/courseAPI'

const Index = () => {

  // authentication functions from app.js context
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  // state variable for all courses
  const [courses, setCourses] = useState([])

  // location vairalbe / navigate function
  const location = useLocation();
  const navigate = useNavigate();

  // custom hook for success notifications
  const {visible, text, showNotification} = useNotification()
  
  // on first load get all lecturers
  // if there is a success message in the url show the success component
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