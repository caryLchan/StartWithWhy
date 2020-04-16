import React, { Fragment, useState } from 'react';

const EditHow = ({ how }) => {
  const [editHow, setEditHow] = useState(how.how)

  const updateHow = async (e) => {
    e.preventDefault();
    try {
      const body = { editHow }
      const howId = how.id
      const response = await fetch(
        `http://localhost:5000/howto/${howId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      )
    } catch (err) {
      console.error('updateHow/EditHow.jsx error:', err.message)
    }
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${how.id}`}>
        Edit
        </button>
      <div
        className="modal"
        id={`id${how.id}`}
        onClick={() => setEditHow(how.how)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit How</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setEditHow(how.how)}
              >&times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type='text'
                className='form-control'
                value={editHow}
                onChange={e => setEditHow(e.target.value)}>
              </input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateHow(e)}>
                Edit
                </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setEditHow(how.how)}>
                Close
                </button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditHow;