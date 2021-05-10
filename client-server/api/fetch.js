/**
 * Fetching from server
 */

let httpProtocol
let hostName
let portNumber

// Uses the browsers built in fetch api
export const browserFetch = async req => {
	let res = {}
	try {
		const { path, method, headers, body, query } = req
		const url = portNumber ? `${httpProtocol}://${hostName}:${portNumber}${path}`
			: `${httpProtocol}://${hostName}${path}${parseQuery(query)}`

		const response = await fetch(url, {
			method,
			headers,
			body: method === 'POST' || method === 'PUT' ? JSON.stringify(parseBody(body)) : null
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

const parseQuery = query => {
	let str = '?'
	for (const [key, value] in Object.entries(query)) {
		if (value) str += `${key}=${value}&`
	}
	return str.slice(0, -1)
}

const parseBody = obj => {
	for (const propName in obj) {
		if (obj[propName] === null || obj[propName] === undefined) {
			delete obj[propName];
		}
	}
	return obj
}

export const setup = (protocol, host, port) => {
	httpProtocol = protocol
	hostName = host
	portNumber = port
}