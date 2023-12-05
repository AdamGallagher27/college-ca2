import React from 'react'

const DeleteButton = ({buttonText, deleteMethod}) => {
  return (
    <>
      <button className="btn btn-error" onClick={() => document.getElementById('my_modal_1').showModal()}>{buttonText}</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to delete?</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <form method="dialog">
              <button onClick={deleteMethod} className="btn btn-error">Delete</button>
            </form>
          </div>
        </div>
      </dialog></>
  )
}

export default DeleteButton