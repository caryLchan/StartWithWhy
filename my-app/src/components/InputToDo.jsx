import React, { Fragment, useState } from "react";

const InputToDo = (props) => {

  const [task, setTask] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const username = await props.loggedIn
      const id = await props.logId
      const body = { username, task }
      if (body.task.length > 0) {
        const response = await fetch(`http://localhost:5000/todos/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }
      setTask('')
    } catch (err) {
      console.error('onSubmitForm/InputToDo component error:', err.message)
    }
  }

  return (
    <Fragment>
      <h1 className='text-center mt-5'> <i>start</i> with why</h1>
      <form className='d-flex mt-5' onSubmit={onSubmitForm}>
        <input type="text" className='form-control' value={task} onChange={e => setTask(e.target.value)} />
        <button className='btn btn-success'>Add</button>
      </form>
      <div className='text-center mt-2'>
        <button onClick={e => props.changeLogin('false')} className='btn btn-danger'>Logout</button>
      </div>
    </Fragment>
  )
}

export default InputToDo;