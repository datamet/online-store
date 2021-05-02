const { db, error } = require('server-framework')
const hash = require('../lib/hash')
const { verifyGoogleToken, authenticate, basic } = require('../lib/jwt')

const Google = {}

Google.authenticate = async (req, res, next) => {
	const id_token = req.query.id_token
	const auth_header = req.header('Authorization')
	const [ _email, password ] = basic(auth_header)
	const token = await verifyGoogleToken(id_token)
	const google_id = token.sub
	const email = token.email
	const email_verified = token.email_verified
	const [first_name, last_name] = token.name.split(' ')
	let user = await db.getUserByEmail({ email })
	if (user && (!user.google_id || user.google_id !== google_id)) {
		if (!password) {
			throw error.custom(
				409,
				`A user with email: ${email} allready exists. Please confirm that it's yours.`,
				{ email }
			)
		}
		hash.compare(user.hash, password)
	}
	if (!user) {
		user = await db.createUser({
			google_id,
			email,
			email_verified,
			first_name,
			last_name,
		})
	}
	await authenticate(user._id, res)
	res.json({ message: 'Authenticated with google' })
	next()
}

module.exports = Google
