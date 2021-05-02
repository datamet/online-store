const Google = {}

Google.authenticate = async (req, res, next) => {
	res.json({ message: 'Authenticated with Google' })
    next()
}

module.exports = Google
