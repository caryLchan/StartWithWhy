const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
const cookieParser = require('cookie-parser')
const users = require('./queries')
const todos = require('./todos')
const howto = require('./howto')
const whatto = require('./whatto')

app.use(cookieParser())
app.use(cors())
app.use(express.json())



app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
})

//create account logic
app.post('/users',
	users.getUsers,
	users.createUser,
	(req, res) => {
		res.status(200).json({
			login: res.locals.login,
			foundUser: res.locals.foundUser
		})
	})
// app.get('/users/:username', users.getUserByName) //not used
// app.put('/users/:id', users.updateUser) //not used
// app.delete('/users/:id', users.deleteUser) //not used

//implement login logic here
app.post('/todos',
	users.verifyUserLogin,
	(req, res) => {
		res.status(200).json({
			foundUser: res.locals.foundUser
		})
	})

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

//howto routes
app.get('/howto/:whyId',
	howto.getHow,
	(req, res) => {
		res.status(200).json(res.locals.hows)
	})
//create a why task
app.post('/howto/:whyId', howto.createHow)
//modify a why task
app.put('/howto/:howId', howto.updateHow)
//delete a why task
app.delete('/howto/:howId', howto.deleteHow)

//whatto routs
app.get('/whatto/:howId',
	whatto.getWhat,
	(req, res) => {
		res.status(200).json(res.locals.whats)
	})
//create a why task
app.post('/whatto/:howId', whatto.createWhat)
//modify a why task
app.put('/whatto/:whatId', whatto.updateWhat)
//delete a why task
app.delete('/whatto/:whatId', whatto.deleteWhat)


//global error handling here... 
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	res.status(errorObj.status).json(errorObj.message);
});


app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
