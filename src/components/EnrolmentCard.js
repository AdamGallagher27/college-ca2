import React from 'react'

const EnrolmentCard = ({ enrolment }) => {

  return (
    <div className="card w-96 bg-primary text-primary-content mb-9">
      <div className="card-body">
        <h2 className="card-title">{enrolment.lecturer.name}</h2>
        <p>Email : {enrolment.lecturer.email}</p>
        <p>Status : {enrolment.status}</p>
        <div className="card-actions justify-end">
          <button className="btn">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default EnrolmentCard