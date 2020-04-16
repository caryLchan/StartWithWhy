const { Pool } = require('pg');

const PG_URI = 'postgres://pdpslqay:7SV5468Y5Cv5IC1sgqPNZ4Wy0Sl8go5g@drona.db.elephantsql.com:5432/pdpslqay';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


const getToDo = async (req, res) => {
  try {
    const getToDoQuery = await pool.query(
      'SELECT * FROM why ORDER BY id ASC'
    )
    // console.log('whats in this get to do query', getToDoQuery.rows)
    res.status(200).json(getToDoQuery.rows)
  } catch (err) {
    console.error('getToDo error', err.message)
  }
}

const getToDoId = async (req, res, next) => {
  // const id = res.locals.foundUser._id
  // console.log('res.locals inside getToDoId/todos.js', res.locals.foundUser.id)
  // console.log("HIT GET TO DO ID")
  // const { username } = req.body
  try {
    // console.log('params', req.params)
    // console.log('body', req.body)

    const { id } = req.params
    // const getUserByNameQuery = await pool.query(
    //   'SELECT * FROM users WHERE username = $1',
    //   [username]
    // )

    // res.locals.foundUser = { ...getUserByNameQuery.rows[0] }
    // console.log('id', res.locals.foundUser.id)
    // const id = res.locals.foundUser.id
    // console.log('id', id)
    const getToDoIdQuery = await pool.query(
      'SELECT w.why, w.userid, w.id FROM why w JOIN users u ON u.id = w.userid WHERE u.id = $1',
      [id]
    )
    // console.log(getToDoIdQuery)
    res.locals.tasksById = getToDoIdQuery.rows
    // console.log('query data RANDOM BIG WORDS', getToDoIdQuery.rows)
    return next();
  } catch (err) {
    console.log('getToDoID error', err)
  }
}

// const createUserTable = async (req, res) => {
//     const { id } = res.locals.foundUser.rows[0]
//     try {
//         const createUserTable = await pool.query('CREATE TABLE why($1)(id SERIAL PRIMARY KEY, task VARCHAR(255))', [id])
//         return next();

//     } catch (err) {
//         console.error('createUserTable/todo.js error', err)
//     }
// }

const createToDo = async (req, res) => {
  const { task } = req.body
  // console.log('did i come here to createToDo')
  const id = req.params.id
  // console.log('id', id)
  try {

    const createToDoInsert = await pool.query(
      'INSERT INTO why (why, userid) VALUES ($1, $2) RETURNING *',
      [task, id]
    )


    res.status(200).json(createToDoInsert.rows[0])
  } catch (err) {
    console.error('createToDo error', err)
  }
}

const updateToDo = async (req, res) => {
  const id = parseInt(req.params.id)
  //need to check the req.body to see what is actually sent here to the server
  const { editTask } = req.body
  // console.log('hello updater')
  // console.log('id: ', id, 'task: ', editTask)
  try {
    const updateToDoUpdate = await pool.query(
      'UPDATE why SET why = $1 WHERE id = $2',
      [editTask, id]
    )
    res.status(200).json(`Task modified with ID: ${id}`)
  } catch (err) {
    console.error('updateToDo error', err)
  }
}

const deleteToDo = async (req, res, next) => {
  const id = parseInt(req.params.id)
  // console.log('delete to do middleware', req.params.id)
  try {


    // console.log('delete to do middle user why after query', deleteToDoMiddle)

    const deleteToDoDelete = await pool.query(
      'DELETE FROM why WHERE id = $1',
      [id]
    )
    // console.log('delete to do why after query', deleteToDoDelete)
    res.status(200).json(`Task deleted with ID: ${id}`)
  } catch (err) {
    // console.log('delete to do server catch block')
    console.error('deleteToDo error', err)
  }
}

module.exports = {
  getToDo,
  getToDoId,
  createToDo,
  updateToDo,
  deleteToDo,
  // createUserTable,
}