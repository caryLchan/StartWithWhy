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

	//create submit method
	const onSubmitForm = async (e) => {
		//prevent refreshes
		e.preventDefault();
		//create get method to backend/server
		try {
			//package up username and password into response (client side) body which would be request body (server side)
			const body = { username, password }
			//create the response from the client side; ie fetch/POST
			const response = await fetch('http://localhost:5000/todos', {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			})
			// console.log('regular response', response)
			// console.log(response) <-- initial result of fetch
			const parsedResponse = await response.json()
			// console.log('parsed', parsedResponse.foundUser.id) //<--- parsed data from index.js(server/backend) --> { login, createUser, message }
			if (parsedResponse) {
				props.logId(parsedResponse.foundUser.id)
				props.loggedIn(parsedResponse.foundUser.username)
			}

			// if (parsedResponse.createUser === false && parsedResponse.login === true) {
			// 		// console.log('conditional', 'event', e)
			// 		props.loginStatus()
			// 		props.createdUser()
			// }

			// window.location = '/'
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
					<iframe width="560" height="315" src="https://www.youtube.com/embed/u4ZoJKF_VuA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen className='video'></iframe>
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