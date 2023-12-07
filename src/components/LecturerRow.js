import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LecturerRow = ({ lecturer, index }) => {

  // function for navigation
  const navigate = useNavigate()

  // go to the lecturer show page
  const showLecturer = () => {
    navigate(`/lecturers/${lecturer.id}`)
  }

  return (
    <tr className="hover" onClick={showLecturer}>
        <th>
          <label>
            <p>{index}</p>
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{lecturer.name}</div>
            </div>
          </div>
        </td>
        <td>
          {lecturer.email}
        </td>
        <td>{lecturer.phone}</td>
    </tr>
  )
}

export default LecturerRow