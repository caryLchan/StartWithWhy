//to use hooks you'll need to bring in useState from react
import React, { Fragment, Component, useState } from 'react';
import './App.css';

//components
import InputToDo from './components/InputToDo'
import ListToDos from './components/ListToDos'
import Login from './components/Login'

//with hooks
const App = () => {
  //first "element" of the array is current state(which is initially nothing), second 'element' emulates setState, passed into the parameter of useState is the initial state that will replace the unintialized state of the first "element"
  const [loggedIn, setLoggedIn] = useState('false')
  const [logId, setLogId] = useState(0)
  //also, notice there's no constructor now that holds the statefulness

  //this method here now does not need to be bound to the constructor of the original
  const checkLoggedIn = val => {
    return setLoggedIn(val)
  }

  const setId = logId => {
    return setLogId(logId)
  }

  //everything below here renders depending on the state of loggedIn
  //if its the string "false" as i've set it, they need to login through my login component
  if (loggedIn === 'false') {
    return (
      <Fragment>
        <div className='container'>
          <Login loggedIn={checkLoggedIn} logId={setId} />
        </div>
      </Fragment>
    )
  }
  else {
    // if the loggedIn state is not false, i'll more logic here that will render the correct components (which i'm not done with yet)
    return (
      <Fragment>
        {/* container created for some spacing preference */}
        <div className='container'>
          <InputToDo loggedIn={loggedIn} logId={logId} />
          <ListToDos loggedIn={loggedIn} logId={logId} />
        </div>
      </Fragment>
    )
  }
}



export default App;
