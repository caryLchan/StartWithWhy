import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditToDo'


const ListToDos = (props) => {

  const [todos, setTodos] = useState([])

  const deleteToDo = async (id) => {
    try {
      const deleteToDo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      })
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error('deleteToDo/ListToDos.jsx error:', err.message)
    }
  }

  const getToDos = async () => {
    try {
      const id = await props.logId

      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const jsonData = await response.json()
      setTodos(jsonData);
    } catch (err) {
      console.error('getToDos/ListToDos.jsx error:', err.message)
    }
  }

  useEffect(() => {
    getToDos();
  })
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>where does your <i>why</i> start</th>
            <th>How</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>{/* <tr key={`todo${todo.id}`}> */}
              <td>{todo.why}</td>
              <td><button className='btn btn-success'
                onClick={e => {
                  props.setStep('how')
                  props.setWhyId(todo.id)
                  props.setWhyTitle(todo.why)
                }
                }>How</button></td>
              <td>
                <EditTodo todo={todo} loggedIn={props.loggedIn} />
              </td>
              <td>
                <button
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

export default ListToDos;