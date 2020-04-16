import React, { Fragment, useState } from 'react';


//must pass in props through the parameter if props were drilled down
const CreateUser = (props) => {
    //declare hooks for username and password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // console.log('props', props)

    //create submit method
    const onSubmitForm = async (e) => {
        //prevent refreshes
        e.preventDefault();
        //create post method to backend/server
        try {
            //package up username and password into response (client side) body which would be request body (server side)
            const body = { username, password }
            console.log(body)
            //create the response from the client side; ie fetch/POST
            const response = await fetch('http://localhost:5000/users', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            // console.log(response) //< --initial result of fetch
            const parsedResponse = await response.json()
            // console.log('parsed', parsedResponse) //<--- parsed data from index.js(server/backend) --> { login, createUser, message }


            if (parsedResponse.login.createUser === false && parsedResponse.login.login === true) {
                // console.log('conditional', 'event', e)
                props.logId(parsedResponse.foundUser.id)
                props.loggedIn(parsedResponse.foundUser.username)
            }

            // window.location = '/'
        } catch (err) {
            console.error('onSubmitForm/CreateUser/CreateUser.jsx component error: ', err.message)
        }
    }

    return (

        <Fragment>
            <h1 className='text-center mt-5'>sign up</h1>
            <form onSubmit={onSubmitForm}>
                <div className='d-flex mt-5'>
                    <h4 type='text'>Username: </h4>
                    <input
                        type='text'
                        className='form-control'
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className='d-flex mt-2'>
                    <h4 type='text'>Password: </h4>
                    <input
                        type='password'
                        className='form-control'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='text-center mt-2'>
                    <button className='btn btn-success' >Submit</button>
                    <button
                        className='btn btn-danger'
                        onClick={e => props.doneWithSignUp(false)}
                    >Back</button>
                </div>
            </form>
        </Fragment>
    )
}

export default CreateUser;





