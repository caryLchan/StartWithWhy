const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const salt = 10;

const PG_URI = 'postgres://pdpslqay:7SV5468Y5Cv5IC1sgqPNZ4Wy0Sl8go5g@drona.db.elephantsql.com:5432/pdpslqay';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

//middleware to get all users
const getUsers = async (req, res, next) => {
  try {
    const getUsersQuery = await pool.query(
      'SELECT * FROM users ORDER BY id ASC'
    )
    //array of users
    res.locals.users = getUsersQuery.rows
    return next();
  } catch (err) {
    console.error('getUsers/queries.js error', err.message)
  }
}

//middleware get user by username.. unused
// const getUserByName = async (req, res, next) => {
//   const { username } = req.params
//   try {
//     const getUserByNameQuery = await pool.query(
//       'SELECT * FROM users WHERE username = $1',
//       [username]
//     )
//     res.locals.foundUser = getUserByNameQuery.rows[0]
//     return next();
//   } catch (err) {
//     console.error('getUserByName/queries.js error', err)
//   }
// }

//verify login middleware
const verifyUserLogin = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const getUserByNameQuery = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    )
    res.locals.foundUser = getUserByNameQuery.rows[0]
    checkPassword = res.locals.foundUser.password
    const verifyPassword = await bcrypt.compare(password, checkPassword)
    if (!verifyPassword) {
      res.redirect('/users')
    }
    return next();
  } catch (err) {
    console.error('verifyUserLogin/queries.js error', err.message)
  }
}

// create user middleware
const createUser = async (req, res, next) => {
  const { username, password } = req.body
  try {
    if (!username || !password) {
      res.locals.login = {
        login: false,
        createUser: true,
        message: 'Must have both username and password to an create account'
      }
      return next();
    }
    for (let user of res.locals.users) {
      if (user.username === username) {
        res.locals.login = {
          login: false,
          createUser: true,
          message: 'Username taken'
        }
        return next();
      }
    }
    const passwordHash = await bcrypt.hash(password, salt)
    const createUserInsert = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, passwordHash]
    )
    const getUserByNameQuery = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    )
    res.locals.foundUser = getUserByNameQuery.rows[0]
    res.locals.login = {
      login: true,
      createUser: false,
      message: `User added with username: ${createUserInsert.username}`
    }
    return next();
  } catch (err) {
    console.error('createUser/queries.js error', err.message)
  }
}

//middleware to create ssid cookie.. unused
// const cookieSSID = async (req, res, next) => {
//   try {
//     userId = res.locals.foundUser.rows.id
//     console.log('ssid user id', res.locals.foundUser.rows[0].id)
//     res.cookie('ssid', userId, {
//       maxAge: 360000,
//       httpOnly: true
//     })
//     return next();
//   } catch (err) {
//     console.error('cookieSSID/queries.js error: ', err.message)
//   }
// }

//unused middleware
// const updateUser = async (req, res) => {
//   const id = parseInt(req.params.id)
//   const { username, password } = req.body
//   try {
//     const updateUserUpdate = await pool.query(
//       'UPDATE users SET username = $1, password = $2 WHERE id = $3',
//       [username, password, id]
//     )
//     res.status(200).send(`User modified with ID: ${id}`)
//   } catch (err) {
//     console.error('updateUser error', err)
//   }
// }

//unused middleware
// const deleteUser = async (req, res) => {
//   const id = parseInt(req.params.id)
//   try {
//     const deleteUserDelete = await pool.query(
//       'DELETE FROM users WHERE id = $1',
//       [id]
//     )
//     res.status(200).send(`User deleted with ID: ${id}`)
//   } catch (err) {
//     console.error('deleteUser error', err)
//   }
// }

module.exports = {
  getUsers,
  // getUserByName,
  createUser,
  // updateUser,
  // deleteUser,
  // cookieSSID,
  verifyUserLogin,
}