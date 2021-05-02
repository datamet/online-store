const { db } = require('../lib/db')

const Users = {}

Users.createOne = async (req, res, next) => {
	await db.createUser({ username: req.body.username })
	res.send('ok')
	next()
}

Users.getOne = async (req, res, next) => {
	const user = await db.getUser({ _id: req.params.user_id })
	delete user.hash
	delete user.salt

	res.json(user)
	next()
}

Users.getMultiple = async (req, res, next) => {
	const users = await db.getUsers()
	res.json(users)
	next()
}

Users.updateOne = async (req, res, next) => {
	const updatedInfo = {}

	if (req.body.username) updatedInfo.username = req.body.username
	if (req.body.password) updatedInfo.password = req.body.password
	if (req.body.groups) updatedInfo.groups = req.body.groups
	if (req.body.email) updatedInfo.email = req.body.email

	const params = {
		updatedInfo,
		id : req.params.user_id
	}
	await db.updateUser(params)
	res.json({
		message: "User updated"
	})
	next()
}

Users.deleteOne = async (req, res, next) => {
	await db.deleteUser({ _id: req.params.user_id })
	res.json({
		message: 'User deleted'
	})
	next()
}

module.exports = Users