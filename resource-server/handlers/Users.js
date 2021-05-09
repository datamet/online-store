const { db, error } = require('server-framework')
const { inGroup } = require('../policies/inGroup')

const Users = {}

Users.getOne = async (req, res, next) => {
	const user = await db.getUser({ _id: req.params.user_id })
	if (!user) throw error.custom(404, 'User does not exist')
	const resUser = {
		_id: user._id,
		username: user.username
	}

	if (inGroup(req.user._id, ['owner', 'admin'], { entity: req.params.user_id })) {
		resUser.email = user.email
	}

	res.json({ user: resUser })
	next()
}

Users.getMultiple = async (req, res, next) => {
	const users = await db.getUsers()
	if (!users) throw error.internal()

	res.json({ users })
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

	const updated = await db.updateUser(params)
	if (!updated) throw error.custom(404, 'Could not update user')
	res.json({ message: 'User updated' })
	next()
}

Users.deleteOne = async (req, res, next) => {
	const deleted = await db.deleteUser({ _id: req.params.user_id })
	if (!deleted) throw error.custom(404, 'Could not delete user')
	res.json({ message: 'User deleted' })
	next()
}

module.exports = Users