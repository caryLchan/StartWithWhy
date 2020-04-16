import React, { Fragment, useState } from 'react';

const EditWhat = ({ what }) => {
  const [editWhat, setEditWhat] = useState(what.what)

  const updateWhat = async (e) => {
    e.preventDefault();
    try {
      const body = { editWhat }
      const whatId = what.id
      const response = await fetch(
        `http://localhost:5000/whatto/${whatId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      )
    } catch (err) {
      console.error('updateHow/EditWhat.jsx error:', err.message)
    }
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${what.id}`}>
        Edit
        </button>
      <div
        className="modal"
        id={`id${what.id}`}
        onClick={() => setEditWhat(what.what)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit What</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setEditWhat(what.what)}
              >&times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type='text'
                className='form-control'
                value={editWhat}
                onChange={e => setEditWhat(e.target.value)}>
              </input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateWhat(e)}>
                Edit
                </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setEditWhat(what.what)}>
                Close
                </button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditWhat;