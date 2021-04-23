/**
 * Exports: Error handeling function that
 * logs erors and sends errors back to the client
 */
const log = require('../logger')

const errorhandler = (error, req, res, next) => {
	const status = error.status ? error.status : 500

	log(log.REJECT, `(${status}) ${req.method.toUpperCase()} ${req.path}`, {
		error,
		status,
	})

	res.status(status).json(
		status === 500
			? { error: 'Internal server error' }
			: { error: error.message }
	)
}

module.exports = errorhandler
