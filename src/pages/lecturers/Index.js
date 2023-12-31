import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom';
import useNotification from '../../utilities/useNotification'
import NotificationBox from '../../components/NotificationBox'
import LecturerTable from '../../components/LecturerTable';
import { catchSuccessParam } from '../../utilities/catchSuccessParam';
import { getAllLecturers } from '../../utilities/lecturers/lecturerAPI';

const Index = () => {
  
  // authentication code from app.js context
  const [isAuthenticated, onAuthenticated] = useContext(Context)

  // state variable to hold all lecturers
  const [lecturers, setLecturers] = useState([])

  // custom hook for showing success notification
  const {visible, text, showNotification} = useNotification()

  // navigate function / current location variable
  const location = useLocation();
  const navigate = useNavigate();

  // on first load get all lecturers
  // if success message in url show success notification
  useEffect(() => {
    getAllLecturers(setLecturers)

    const urlParams = new URLSearchParams(location.search);
    const successParam = urlParams.get('success');

    if (successParam) {
      showNotification(catchSuccessParam(successParam), 1500)
      navigate('/lecturers')
    }
  }, [])

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