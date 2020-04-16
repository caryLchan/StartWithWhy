import React, { Fragment, useState, useEffect } from 'react';
import EditWhat from './EditWhat'

const WhatList = (props) => {

  const [whats, setWhats] = useState([])

  const deleteWhat = async (id) => {
    const whatId = id
    try {
      const deleteWhat = await fetch(`http://localhost:5000/whatto/${whatId}`, {
        method: "DELETE"
      })
      setWhats(whats.filter((what) => what.id !== id))
    } catch (err) {
      console.error('deleteHow/WhatList.jsx error:', err.message)
    }
  }

  const getWhats = async () => {
    try {
      const howId = await props.howId
      const response = await fetch(`http://localhost:5000/whatto/${howId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const jsonData = await response.json()
      setWhats(jsonData);
    } catch (err) {
      console.error('getHows/WhatList.jsx error:', err.message)
    }
  }

  useEffect(() => {
    getWhats();
  })
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th><i>what</i> specifics</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {whats.map((what) => (
            <tr key={what.id}>
              <td>{what.what}</td>
              <td>
                <EditWhat what={what} loggedIn={props.loggedIn} />
              </td>
              <td><button
                className='btn btn-danger'
                onClick={() => deleteWhat(what.id)}
              >Delete
                                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

export default WhatList;