const { db, error } = require('server-framework')

const Validator = {}

Validator.emailExist = async (req, res, next) => {
	const email = req.body.email

	const user = await db.getUserByEmail({ email })
	if (user) throw error.custom(409, 'A user with that email already exists')
	res.json({ message: 'Valid email' })
}

module.exports = Validator