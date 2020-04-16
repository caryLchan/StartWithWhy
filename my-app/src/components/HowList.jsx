import React, { Fragment, useState, useEffect } from 'react';
import EditHow from './EditHow'

const HowList = (props) => {

  const [hows, setHows] = useState([])

  const deleteHow = async (id) => {
    const howId = id
    try {
      const deleteHow = await fetch(`http://localhost:5000/howto/${howId}`, {
        method: "DELETE"
      })
      setHows(hows.filter((how) => how.id !== id))
    } catch (err) {
      console.error('deleteHow/HowList.jsx error:', err.message)
    }
  }

  const getHows = async () => {
    try {
      const whyId = await props.whyId
      const response = await fetch(`http://localhost:5000/howto/${whyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const jsonData = await response.json()
      setHows(jsonData);
    } catch (err) {
      console.error('getHows/HowList.jsx error:', err.message)
    }
  }

  useEffect(() => {
    getHows();
  })
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th><i>how</i> to complete your why</th>
            <th>What</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {hows.map((how) => (
            <tr key={how.id}>
              <td>{how.how}</td>
              <td><button className='btn btn-success'
                onClick={e => {
                  props.setStep('what')
                  props.setHowId(how.id)
                }
                }>What</button></td>
              <td>
                <EditHow how={how} loggedIn={props.loggedIn} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteHow(how.id)}
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

export default HowList;