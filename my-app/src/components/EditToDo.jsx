import React, { Fragment, useState } from 'react';

const EditToDo = ({ todo }) => {
    // console.log('todo props', todo)
    const [editTask, setEditTask] = useState(todo.why)

    //edit task function; passes in e event to capture event on listener
    const updateTask = async (e) => {
        e.preventDefault();
        try {
            // console.log('inside update method, whats the id', todo.why_id)
            //package the task into the label body, whatever the state/task will be updated to; this body will be sent to the server after it is parsed through JSON.stringify... the server will receive it as the req.body, to be used in the update middleware to update the database
            const body = { editTask }
            // console.log('body: ', body, 'task id: ', todo.id)
            const response = await fetch(
                `http://localhost:5000/todos/${todo.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            )
            // console.log('EDITTODO server response after fetching end point with modified requests', response)
            // refreshes and shows changes after sending response
            // window.location = '/'
        } catch (err) {
            console.error('updateTask/EditToDo.jsx error:', err.message)
        }
    }

    return (
        <Fragment>
            {/* <!-- Button to Open the Modal -->*/}
            {/* the # in data-targets attribute the id specified on the div classname modal attribute with classname id attribute */}
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${todo.id}`}>
                Edit
            </button>

            {/*<!-- The Modal -->*/}
            {/* 
                add a number string to id
                ex: id = id10
            */}
            <div
                className="modal"
                id={`id${todo.id}`}
                onClick={() => setEditTask(todo.why)}>
                {/* REFERENCING ABOVE DIV... I think this is the div that grays out the entire page except for the modal; if you exit the edit modal without saving the edit; this onclick listener will revert the task back to its original task; this is when you click outside of the modal */}
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/*<!-- Modal Header -->*/}
                        <div className="modal-header">
                            <h4 className="modal-title">Edit ToDo</h4>
                            {/* if you exit the edit modal without saving the edit; this onclick listener will revert the task back to its original task; this is the X BUTTON inside of the modal on top right corner */}
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => setEditTask(todo.why)}
                            >&times;
                            </button>
                        </div>

                        {/*<!-- Modal body -->*/}
                        {/* value of input would be the current state of editTask; onChange listener would set the change to the current state as the text box is modified */}
                        <div className="modal-body">
                            <input
                                type='text'
                                className='form-control'
                                value={editTask}
                                onChange={e => setEditTask(e.target.value)}>
                            </input>
                        </div>

                        {/*<!-- Modal footer -->*/}
                        {/* listener used to send the PUT request to update the task through the updateTask functionality */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={e => updateTask(e)}>
                                Edit
                            </button>
                            {/* if you exit the edit modal without saving the edit; this onclick listener will revert the task back to its original task; this is the CLOSE BUTTON inside of the modal bottom right footer */}
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setEditTask(todo.why)}>
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditToDo;