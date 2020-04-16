import React, { Fragment, useState } from 'react';

const How = (props) => {

  const [how, setHow] = useState('')


  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const whyId = await props.whyId
      const body = { how, whyId }
      if (body.how.length > 0) {
        const response = await fetch(`http://localhost:5000/howto/${whyId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }
      setHow('')
    } catch (err) {
      console.error('onSubmitForm/How.jsx component error:', err.message)
    }
  }

  return (
    <Fragment>
      <h1 className='text-center mt-5'>{props.whyTitle}</h1>
      <form className='d-flex mt-5' onSubmit={onSubmitForm}>
        <input type="text" className='form-control' value={how} onChange={e => setHow(e.target.value)} />
        <button className='btn btn-success'>Add</button>
      </form>
      <div className='text-center mt-2'>
        <button onClick={e => props.setStep('why')} className='btn btn-danger'>Back</button>
      </div>
    </Fragment>
  )
}

export default How;