import { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import axios from 'axios'
import NavBar from '../../components/NavBar'
import CourseTable from '../../components/CourseTable'
import { useParams } from 'react-router-dom'

const Index = () => {

  const COLLEGE_API_INDEX = 'https://college-api.vercel.app/api/courses'
  const [isAuthenticated, onAuthenticated] = useContext(Context)
  const [courses, setCourses] = useState([])
  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect(() => {
    getAllCourses()
  }, [])

  // useEffect(() => {
  //   console.log(successBanner)
  // }, [successBanner])

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
      <div className="hero px-0">
        <CourseTable courses={courses} />
      </div>
    </>
  )
}

export default Index