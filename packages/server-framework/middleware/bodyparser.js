/**
 * Exports: Parsing function that parses a request body stream
 * and attaches it to request object before continuing.
 */

const bodyparser = (req, res, next) => {
	let data = ''

	req.on('data', chunk => (data += chunk))

	req.on('end', () => {
		if (req.is('application/json')) {
			try {
				req.body = JSON.parse(data)
				next()
			} catch (err) {
				next(err)
			}
			return
		}
		req.rawBody = data
		req.body = {}
		next()
	})
}

module.exports = bodyparser
