const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
const cookieParser = require('cookie-parser')
const users = require('./queries')
const todos = require('./todos')

app.use(cookieParser())
app.use(cors())
app.use(express.json())



app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users/:username', users.getUserByName) //not used


//create account logic
app.post('/users',
	users.getUsers,
	users.createUser,
	// users.getUserByName,
	// users.cookieSSID,
	// todos.createUserTable,
	(req, res) => {
		res.status(200).json({
			login: res.locals.login,
			foundUser: res.locals.foundUser
		})
	})

//implement login logic here
app.post('/todos',
	users.verifyUserLogin,
	// todos.getToDoId,
	(req, res) => {
		res.status(200).json({
			// tasksById: res.locals.tasksById,
			foundUser: res.locals.foundUser
		})
	})

// app.put('/users/:id', users.updateUser) //not used
// app.delete('/users/:id', users.deleteUser) //not used

// after login logic to fetch id with username, then use id to fetch from the data base, then pass back the data to the front end to parse into an object
app.get('/todos/:id',
	todos.getToDoId,
	(req, res) => {
		res.status(200).json(res.locals.tasksById)
	})

//create a why task
app.post('/todos/:id', todos.createToDo)

//modify a why task
app.put('/todos/:id', todos.updateToDo)

//delete a why task
app.delete('/todos/:id', todos.deleteToDo)


//global error handling here... 
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	return res.status(errorObj.status).json(errorObj.message);
});


app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
