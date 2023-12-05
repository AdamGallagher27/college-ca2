import React from 'react'

const EnrolmentCard = ({ name }) => {

    return (
      <div className="card w-96 bg-primary text-primary-content mb-9">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    )
  

  
}

export default EnrolmentCard