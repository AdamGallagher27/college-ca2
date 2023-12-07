import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseRow = ({course, index}) => {

  // navigate function
  const navigate = useNavigate()

  // click handler
  const handleClick = () => {
    navigate(`/courses/show/${course.id}`)
  }
  
  return (
    <tr onClick={handleClick} className="hover">
          <th>{index}</th>
          <td>{course.title}</td>
          <td>{course.code}</td>
          <td>{course.points}</td>
    </tr>
  )
}

export default CourseRow