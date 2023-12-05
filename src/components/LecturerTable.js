import React, { useState } from 'react'
import LecturerRow from './LecturerRow'
import { useNavigate } from 'react-router-dom'

const LecturerTable = ({lecturers}) => {

  const [paginationLimit, setPaginationLimit] = useState(6)
  const resetPagination = () => setPaginationLimit(6)
  const loadMoreRows = () => setPaginationLimit(paginationLimit + 5)
  const navigate = useNavigate()

  const lecturerRows = lecturers.map((lecturer, index) => {
    if(index < paginationLimit){
      return <LecturerRow key={index} lecturer={lecturer} index={index} />
    }
  })

  const createLecturer = () => {
    navigate('/lecturers/create')
  }

  if(lecturers === null) return <>loading</>

  return (
    <div style={{width: '80%'}}>
      <button onClick={createLecturer} className="btn btn-success">Create New Lecturer</button>
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
        {lecturers.length > paginationLimit ? <button onClick={loadMoreRows} className="btn btn-neutral">Load More Rows</button> : ''}
    </div>
  )
}

export default LecturerTable