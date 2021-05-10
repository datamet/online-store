/**
 * Exports: Object of custom error methods.
 * When called they will throw an error with message
 * and status code predefined.
 */

const error = {
	custom: (status, message, responseObj) => {
		const err = new Error(message)
		err.status = status
		err.resObj = responseObj
		return err
	},
	exists: () => error.custom(409, 'Resource already exists'),
	missing: () => error.custom(403, 'Missing required fields'),
	notfound: () => error.custom(404, 'Resource not found'),
	internal: () => error.custom(500, 'Internal server error'),
	invalid: () => error.custom(403, 'Invalid format'),
	credentials: () => error.custom(401, 'Invalid username/password'),
	authentication: () => error.custom(401, 'Authentication failed'),
	unauthorized: () => error.custom(401, 'Unauthorized'),
	expired: () => error.custom(401, 'Session expired'),
	config: () => error.custom(500, 'Server configuration error'),
	bad: () => error.custom(400, 'Bad request')
}

module.exports = error