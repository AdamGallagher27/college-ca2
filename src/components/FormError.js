import React from 'react'

const FormError = ({errorMessage}) => {
  return (
    <div className='mb-2 text-error'>{errorMessage ? errorMessage : ''}</div>
  )
}

export default FormError