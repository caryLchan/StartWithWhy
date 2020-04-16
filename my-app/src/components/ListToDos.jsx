import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditToDo'

const ListToDos = (props) => {
    // hooks to create/set the state
    const [todos, setTodos] = useState([])

    //delete todo function... id is what will passed down to the delete onclick
    const deleteToDo = async (id) => {
        console.log(todos)
        console.log('id parameter', id)


        try {
            //fetch request with temperate literal to pass in a variable, id; also pass into fetch request an object to set the fetch method or {headers etc}
            const deleteToDo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            })
            // console.log('deleteToDo:', deleteToDo)

            //remove from rendered dom the todo data that matches the id that was passed in
            setTodos(todos.filter((todo) => todo.id !== id))
            // console.log(todos)
            // window.location = '/'
        } catch (err) {
            console.error('deleteToDo/ListToDos.jsx error:', err.message)
        }
    }
    const getToDos = async () => {
        try {
            // console.log('props login;', props.loggedIn)
            // const username = await props.loggedIn
            const id = await props.logId
            // console.log('props', id)
            // const body = { username }
            // console.log('body', body, 'username', username)
            //fetches database of the todo tasks, end point that leads to index.js route handler
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                // body: JSON.stringify(body)
            })
            //parses json data into object
            const jsonData = await response.json()
            // console.log('did we get a response', response, 'parsed', jsonData)

            //set the new state
            setTodos(jsonData);

        } catch (err) {
            console.error('getToDos/ListToDos.jsx error:', err.message)
        }
    }

    //constantly makes requests
    useEffect(() => {
        getToDos();
        //the empty array prevents it from constantly making requests
    })
    //this component's state = todos, which is an array
    //this array of objects: each object has id key/value and task key/value
    // console.log(todos)
    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    {/* table row header, mostly static */}
                    <tr>
                        <th>Where Does Your Why Start</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* example row that will be rendered into the dom */}
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>  */}
                    {/*mapped (reduce method) out the todos array that was fetched through our server, into our database, and back here to be used*/}
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.why}</td>
                            <td>
                                {/* prop drilling REACT HOOKS style */}
                                <EditTodo todo={todo} loggedIn={props.loggedIn} />
                            </td>
                            {/* more style scripts from className, i assume, this will be linked to the DeleteToDo jsx; onClick listener to involve the deleteToDo function passing in the todo.id to target this database entry */}
                            <td><button
                                className='btn btn-danger'
                                onClick={() => deleteToDo(todo.id)}
                            >Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

//exports component to be usable elsewhere
export default ListToDos;