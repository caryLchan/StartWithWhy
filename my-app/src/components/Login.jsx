import React, { Fragment, useState } from "react";
import CreateUser from './CreateUser'


const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [needSignUp, setNeedSignUp] = useState(false)

  const createSignUp = (val) => {
    return setNeedSignUp(val)
  }

  const doneWithSignUp = (val) => {
    return setNeedSignUp(val)
  }
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { username, password }
      const response = await fetch('http://localhost:5000/todos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      const parsedResponse = await response.json()
      if (parsedResponse) {
        props.logId(parsedResponse.foundUser.id)
        props.loggedIn(parsedResponse.foundUser.username)
      }
    } catch (err) {
      console.error('onSubmitForm/login/Login.jsx component error: ', err.message)
    }
  }

  if (needSignUp === true)
    return (
      <Fragment>
        <div className='container'>
          <CreateUser
            loggedIn={props.loggedIn}
            doneWithSignUp={doneWithSignUp}
            userId={props.userId}
          />
        </div>
      </Fragment>
    )
  else {
    return (
      <Fragment>
        <h1 className='text-center mt-5'><i>start</i> with why</h1>
        <center>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/u4ZoJKF_VuA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='video'></iframe>
        </center>
        <form onSubmit={onSubmitForm} >
          <div className='d-flex mt-5'>
            <h4 type='text'>Login: </h4>
            <input
              type='text'
              className='form-control'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='d-flex mt-2'>
            <h4 type='text'>Password: </h4>
            <input
              type='text'
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='text-center mt-2'>
            <button className='btn btn-success'>Login</button>
            <button
              className='btn btn-warning'
              onClick={e => createSignUp(true)}
            >Create New Login</button>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default Login;