const { Pool } = require('pg');

const PG_URI = 'postgres://pdpslqay:7SV5468Y5Cv5IC1sgqPNZ4Wy0Sl8go5g@drona.db.elephantsql.com:5432/pdpslqay';

const pool = new Pool({
  connectionString: PG_URI
});

//unused middleware... need to grab list by id
// const getToDo = async (req, res) => {
//   try {
//     const getToDoQuery = await pool.query(
//       'SELECT * FROM why ORDER BY id ASC'
//     )
//     res.status(200).json(getToDoQuery.rows)
//   } catch (err) {
//     console.error('getToDo error', err.message)
//   }
// }

const getToDoId = async (req, res, next) => {

  try {
    const { id } = req.params
    const getToDoIdQuery = await pool.query(
      'SELECT w.why, w.userid, w.id FROM why w JOIN users u ON u.id = w.userid WHERE u.id = $1',
      [id]
    )
    res.locals.tasksById = getToDoIdQuery.rows
    return next();
  } catch (err) {
    console.log('getToDoID error', err)
  }
}


const createToDo = async (req, res) => {
  const { task } = req.body
  const id = req.params.id
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
  const { editTask } = req.body
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
  try {
    const deleteToDoDelete = await pool.query(
      'DELETE FROM why WHERE id = $1',
      [id]
    )
    res.status(200).json(`Task deleted with ID: ${id}`)
  } catch (err) {
    console.error('deleteToDo error', err)
  }
}

module.exports = {
  // getToDo,
  getToDoId,
  createToDo,
  updateToDo,
  deleteToDo,
}