import React from 'react'
import { useNavigate } from 'react-router-dom'

const EnrolmentRow = ({enrolment, index}) => {

  const navigate = useNavigate()

  const showEnrolment = () => {
    navigate(`/enrolments/${enrolment.id}`)
  }

  return (
    <tr onClick={showEnrolment} className="hover">
          <th>{index}</th>
          <td>{enrolment.lecturer.name}</td>
          <td>{enrolment.course.title}</td>
          <td>{enrolment.status}</td>
    </tr>
  )
}

export default EnrolmentRow