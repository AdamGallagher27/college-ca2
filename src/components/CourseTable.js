import React, { useEffect, useState } from 'react'
import CourseRow from './CourseRow'
import { useNavigate } from 'react-router-dom'

const CourseTable = ({courses}) => {

  useEffect(() => {
    resetPagination()
  }, [])

  const [paginationLimit, setPaginationLimit] = useState(6)
  const navigate = useNavigate()
  
  const resetPagination = () => setPaginationLimit(6)
  const loadMoreRows = () => setPaginationLimit(paginationLimit + 5)

  const createCourse = () => {
    navigate('/courses/create')
  }

  const courseRows = courses.map((course, index) =>{
    if(index < paginationLimit){
      return <CourseRow key={index} course={course} index={index} />
    }
  })

  if(courses.length === 0) {
    return <p>no courses to show</p>
  }

  return (
    <div style={{width: '80%'}}>
    <button onClick={createCourse} className="btn btn-success">Create New Course</button>
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Index</th>
          <th>Title</th>
          <th>Code</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {courseRows}
      </tbody>
    </table>
    {courses.length > paginationLimit ? <button onClick={loadMoreRows} className="btn btn-neutral">Load More Rows</button> : ''}
    
  </div>
  )
}

export default CourseTable