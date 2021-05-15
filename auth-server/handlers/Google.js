const { db, error, log } = require('server-framework')
const hash = require('../lib/hash')
const { verifyGoogleToken, authenticate, basic } = require('../lib/jwt')

const Google = {}

Google.authenticate = async (req, res, next) => {
	const id_token = req.query.id_token
	const auth_header = req.header('Authorization')
	const [_email, password] = basic(auth_header)
	const token = await verifyGoogleToken(id_token)
	const google_id = token.sub
	const email = token.email
	const email_verified = token.email_verified
	const [username] = token.name.split(' ')
	let user = await db.getUserByEmail({ email })
	if (user && (!user.google_id || user.google_id !== google_id)) {
		if (!password) {
			throw error.custom(
				409,
				`A user with email: ${email} allready exists. Please confirm that it's yours.`,
				{ email }
			)
		}
		const credentials = await db.getHashByEmail({ email })
		hash.compare(credentials.hash, password)
		await db.addGoogleIdToUser({ user_id: user._id, google_id })
		log(log.DEBUG, `Linking local account: ${email} with google_id: ${google_id}`)
	}
	if (!user) {
		user = await db.createUser({
			google_id,
			email,
			email_verified,
			username,
			groups: ['user']
		})
	}
	await authenticate(user._id, req, res)
	res.json({ message: 'Authenticated with google' })
	next()
}

module.exports = Google
