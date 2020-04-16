import React, { Fragment, useState } from 'react';

const What = (props) => {

  const [what, setWhat] = useState('')


  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const username = await props.loggedIn
      const howId = await props.howId
      const body = { username, what, howId }
      if (body.what.length > 0) {
        const response = await fetch(`http://localhost:5000/whatto/${howId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }
      setWhat('')
    } catch (err) {
      console.error('onSubmitForm/How.jsx component error:', err.message)
    }
  }

  return (
    <Fragment>
      <h1 className='text-center mt-5'>specifically <i>what</i> will you do</h1>
      <form className='d-flex mt-5' onSubmit={onSubmitForm}>
        <input type="text" className='form-control' value={what} onChange={e => setWhat(e.target.value)} />
        <button className='btn btn-success'>Add</button>
      </form>
      <div className='text-center mt-2'>
        <button onClick={e => props.setStep('how')} className='btn btn-danger'>Back</button>
      </div>
    </Fragment>
  )
}

export default What;