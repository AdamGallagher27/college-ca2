import {useEffect, useState} from 'react'
import EnrolmentRow from './EnrolmentRow'
import { useNavigate } from 'react-router-dom'

const EnrolmentTable = ({ enrolments }) => {

  useEffect(() => {
    resetPagination()
  }, [])

  // navigate function
  const navigate = useNavigate()
  
  const [paginationLimit, setPaginationLimit] = useState(6)
  const resetPagination = () => setPaginationLimit(11)
  const loadMoreRows = () => setPaginationLimit(paginationLimit + 5)

  // go to the enrolment create page
  const createEnrolment = () => {
    navigate('/enrolments/create')
  }

  // variable to hold enrolment rows
  const enrolmentsRows = enrolments.map((enrolment, index) => {
    if(index < paginationLimit) {
      return <EnrolmentRow key={index} enrolment={enrolment} index={index} />
    }
  })

  return (
    <div style={{ width: '80%' }}>
      <button onClick={createEnrolment} className="btn btn-success">Create New Enrolment</button>
      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Lecturer</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {enrolmentsRows}
        </tbody>
      </table>
      {enrolments.length > paginationLimit ? <button onClick={loadMoreRows} className="btn btn-neutral">Load More Rows</button> : ''}
    </div>
  )
}

export default EnrolmentTable