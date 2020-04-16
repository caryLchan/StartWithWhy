import React, { Fragment, Component, useState } from 'react';
import './App.css';

import InputToDo from './components/InputToDo'
import ListToDos from './components/ListToDos'
import Login from './components/Login'
import How from './components/How'
import HowList from './components/HowList'
import What from './components/What'
import WhatList from './components/WhatList'

const App = () => {

  const [loggedIn, setLoggedIn] = useState('false')
  const [logId, setLogId] = useState(0)
  const [step, setStep] = useState('why')
  const [whyId, setWhyId] = useState(0)
  const [howId, setHowId] = useState(0)
  const [whyTitle, setWhyTitle] = useState('')
  const [howTitle, setHowTitle] = useState('')


  const setupHowTitle = how => {
    return setHowTitle(how)
  }

  const setupWhyTitle = why => {
    return setWhyTitle(why)
  }

  const setupHowId = howId => {
    return setHowId(howId)
  }

  const setupWhyId = whyId => {
    return setWhyId(whyId)
  }

  const checkLoggedIn = val => {
    return setLoggedIn(val)
  }

  const setId = logId => {
    return setLogId(logId)
  }

  const setupStep = step => {
    return setStep(step)
  }

  if (loggedIn === 'false') {
    return (
      <Fragment>
        <div className='container'>
          <Login loggedIn={checkLoggedIn} logId={setId} />
        </div>
      </Fragment>
    )
  }
  else if (step === 'why' && loggedIn !== 'false') {
    return (
      <Fragment>
        <div className='container'>
          <InputToDo changeLogin={checkLoggedIn} logId={logId} />
          <ListToDos setWhyTitle={setupWhyTitle} setWhyId={setupWhyId} setStep={setupStep} logId={logId} />
        </div>
      </Fragment>
    )
  }
  else if (step === 'how' && loggedIn !== 'false') {
    return (
      <Fragment>
        <div className='container'>
          <How whyTitle={whyTitle} whyId={whyId} setStep={setupStep} />
          <HowList setHowTitle={setupHowTitle} whyId={whyId} setHowId={setupHowId} setStep={setupStep} />
        </div>
      </Fragment>
    )
  }
  else if (step === 'what' && loggedIn !== 'false') {
    return (
      <Fragment>
        <div className='container'>
          <What howTitle={howTitle} howId={howId} setStep={setupStep} />
          <WhatList howId={howId} />
        </div>
      </Fragment>
    )
  }
}



export default App;
