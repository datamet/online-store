/**
 * Fetching from server
 */

let httpProtocol
let hostName
let portNumber

// Uses the browsers built in fetch api
const browserFetch = async req => {
	let res = {}
	try {
		const { path, method, headers, body } = req
		const url = portNumber ? `${httpProtocol}://${hostName}:${portNumber}${path}`
			: `${httpProtocol}://${hostName}${path}`

		const response = await fetch(url, {
			method,
			headers,
			body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : null
		})

		if (response.headers.get('Content-Type') === 'application/json; charset=utf-8') {
			res.body = await response.json()
			res.status = response.status
		}
	} catch (err) {
		res.status = 408
		res.body = {
			error: {
				message: 'Could not connect to the server'
			}
		}
	}
	return res
}

export default (protocol, host, port) => {
	httpProtocol = protocol
	hostName = host
	portNumber = port
	return browserFetch
}