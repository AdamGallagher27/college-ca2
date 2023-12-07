import React, { useState, useEffect } from 'react'
import LecturerRow from './LecturerRow'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { applySearchFilter } from '../utilities/applySearchFilter'

const LecturerTable = ({lecturers}) => {

  useEffect(() => {
    resetPagination()
    setFilteredLecturers(lecturers)
  }, [lecturers])
  
  // state variables
  const [filteredLecturers, setFilteredLecturers] = useState([])  
  const [paginationLimit, setPaginationLimit] = useState(11)
  const [searchTerm, setSearchTerm] = useState('')

  // function for navigating
  const navigate = useNavigate()

  // pagination hellper functions
  const resetPagination = () => setPaginationLimit(11)
  const loadMoreRows = () => setPaginationLimit(paginationLimit + 5)
  
  // variable to hold all the lecturer rows
  const lecturerRows = filteredLecturers.map((lecturer, index) => {
    if(index < paginationLimit){
      return <LecturerRow key={index} lecturer={lecturer} index={index} />
    }
  })

  // helper function to handle user searching
  const handleSearch = (searchPhrase) => {
    resetPagination()

    setSearchTerm(searchPhrase)

    const searchFilter = applySearchFilter(searchPhrase, lecturers, 'name')

    setFilteredLecturers(searchFilter)
  }

  // navigate to the create lecturer form
  const createLecturer = () => {
    navigate('/lecturers/create')
  }

  if(lecturers === null) return <>loading</>

  return (
    <div style={{width: '80%'}}>
      <button onClick={createLecturer} className="btn btn-success">Create New Lecturer</button>
      <SearchBar handleSearch={handleSearch} />

      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {lecturerRows}
        </tbody>
      </table>
        {filteredLecturers.length > paginationLimit ? <button onClick={loadMoreRows} className="btn btn-neutral">Load More Rows</button> : ''}
    </div>
  )
}

export default LecturerTable