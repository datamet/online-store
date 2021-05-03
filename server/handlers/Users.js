const { db } = require('../lib/db')
const { inGroup } = require('../lib/middleware/policies/inGroup')
const error = require('../lib/error')

const Users = {}

Users.getOne = async (req, res, next) => {
	const user = await db.getUser({ _id: req.params.user_id })
	if (!user) throw error.custom(404, 'User does not exist')
	const resUser = {
		_id: user._id,
		username: user.username
	}

	if (inGroup(user._id, ['owner', 'admin'])) {
		resUser.email = user.email
		if (resUser.cart) resUser.cart = user.cart
	}

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
	if (req.body.groups) updatedInfo.groups = req.body.groups
	if (req.body.email) updatedInfo.email = req.body.email

	const params = {
		updatedInfo,
		_id: req.params.user_id
	}

	await db.updateUser(params)
	res.json({
		message: 'User updated'
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