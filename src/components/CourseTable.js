import React, { useEffect, useState } from 'react'
import CourseRow from './CourseRow'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { applySearchFilter } from '../utilities/applySearchFilter'


const CourseTable = ({courses}) => {

  useEffect(() => {
    resetPagination()
    setFilteredCourses(courses)
  }, [courses])

  // state variables
  const [filteredCourses, setFilteredCourses] = useState([])
  const [paginationLimit, setPaginationLimit] = useState(6)
  const [searchTerm, setSearchTerm] = useState('')

  // navigate function
  const navigate = useNavigate()
  
  // pagination helper functions
  const resetPagination = () => setPaginationLimit(11)
  const loadMoreRows = () => setPaginationLimit(paginationLimit + 5)

  // take user to create route
  const createCourse = () => {
    navigate('/courses/create')
  }

  // search helper function
  const handleSearch = (searchPhrase) => {

    // reset the pagination
		resetPagination()

    setSearchTerm(searchPhrase)

    const searchFilter = applySearchFilter(searchPhrase, courses, 'title')

    setFilteredCourses(searchFilter)
  }

  // course rows variable
  const courseRows = filteredCourses.map((course, index) =>{
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
    <SearchBar handleSearch={handleSearch} />
    <table className="table">
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
    {filteredCourses.length > paginationLimit ? <button onClick={loadMoreRows} className="btn btn-neutral">Load More Rows</button> : ''}
    
  </div>
  )
}

export default CourseTable