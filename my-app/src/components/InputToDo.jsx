import React, { Fragment, useState } from "react";

const InputToDo = (props) => {
    // react hooks; similar to [state, setState]
    const [task, setTask] = useState('')

    //function created to be invoked when the onSubmit listener is activated
    const onSubmitForm = async (e) => {
        //prevents refreshes as you type into the text box... maybe because the onChange listener would refresh as you change the value of the text box
        e.preventDefault();
        try {
            // package up the tasks within the body as an object with key 'task' and value 'whatever is inputted into text box'
            const username = await props.loggedIn
            const id = await props.logId
            const body = { username, task }
            // console.log(props)
            // console.log(body.task.length)
            // console.log('task', task, 'body', body, 'username', username)
            //ex: task = 'string submitted from input'; body = {task: 'string submitted from input'}

            //unassigned label that performed the fetch request... in this case, the fetch request does not need the label
            if (body.task.length > 0) {
                const response = await fetch(`http://localhost:5000/todos/${id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                })
                // console.log('what is the response', response)
            }
            setTask('')
            // refreshes and shows changes after sending response
            // window.location = '/'
        } catch (err) {
            console.error('onSubmitForm/InputToDo component error:', err.message)
        }
    }

    return (
        <Fragment>
            {/* text-center to center, mt-5 adds a 5unit margin above the text */}
            <h1 className='text-center mt-5'> <i>start</i> with why</h1>
            {/* create a form to submit something, d-flex bootstrap css scripts to contain the entire form (input & button) on one line; onSubmit listener performs the function set by onSubmitForm  */}
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                {/* input type text, the box you can write into, form control (provided by bootstrap css scripts) stretches the text box across the page, initial state set as value from react hooks, which initially is an empty string ''; onChange listener sets the new state of this component by event targeting; the setTask method is the react hook that sets the new state as you type */}
                <input type="text" className='form-control' value={task} onChange={e => setTask(e.target.value)} />
                {/* add button next to the input text box, class name refers to the css styling provided by bootstrap scripts */}
                <button className='btn btn-success'>Add</button>
            </form>
        </Fragment>
    )
}

//exports component to be used elsewhere (App.js in this case)
export default InputToDo;