/**
 * Fetching from server
 */

let config

// Uses the browsers built in fetch api
const browserFetch = async (req, res, next) => {
	try {
		const { path, method, headers, body } = req
		const url = config.port ? `http://${config.host}:${config.port}${path}` : `http://${config.host}${path}`
		const response = await fetch(url, {
			method,
			headers,
			body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : null
		})

		if (response.headers.get('Content-Type') === 'application/json; charset=utf-8') {
			const data = await response.json()
			res.status = response.status
			res.body = data
		}
		else {
			console.log(await response.text())
		}
		next()
	}
	catch(err) {
		res.status = 408
		res.body = { error: "Could not connect to the server" }
		next()
	}
}

export default (options) => {
	config = options
	return browserFetch
}