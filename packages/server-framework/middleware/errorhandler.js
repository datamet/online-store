/**
 * Exports: Error handeling function that
 * logs erors and sends errors back to the client
 */
const { log } = require('../lib/logger')

const errorhandler = (error, req, res, next) => {
    const auth = req.user && req.user._id ? `(user: ${req.user._id})` : `(unauthenticated)`
	const status = error.status ? error.status : 500

	log(log.REJECT, `(${status}) ${req.method.toUpperCase()} ${req.path} ${auth}`, {
		error,
		status,
	})

	let e = {}

	if (status === 500) e = { message: 'Internal server error' }
	else {
		if (error.resObj) e = { ...error.resObj }
		e.message = error.message
	}

	res.status(status).json({ error: e })
	res.end()
}

module.exports = errorhandler
