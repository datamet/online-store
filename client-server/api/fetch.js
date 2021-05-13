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
		const url = `${httpProtocol}://${hostName}${portNumber ? `:${portNumber}` : ''}${path}${parseQuery(query)}`

		const response = await fetch(url, {
			method,
			headers: parseHeader(headers, body, method),
			body: method === 'POST' || method === 'PUT' ? JSON.stringify(parseBody(body)) : null
		})

		if (response.headers.get('Content-Type') === 'application/json; charset=utf-8') {
			res.body = await response.json()
			res.status = response.status
		}
	} catch (err) {
		console.log(err)
		res.status = 408
		res.body = {
			error: {
				message: 'Could not connect to the server'
			}
		}
	}
	return res
}

const parseHeader = (headers, body, method) => {
	const header = {
		...headers
	}

	if ((method === 'POST' || method === 'PUT') && body) {
		header["Content-Type"] = 'application/json'
	}

	return header
}

const parseQuery = query => {
	if (!query) return ''
	let str = '?'
	for (const [key, value] of Object.entries(query)) {
		console.log(key, value)
		if (Array.isArray(value)) {
			for (const val of value) {
				str += `${key}=${val}&`
			}
		}
		else if (value) str += `${key}=${value}&`
	}
	return str.slice(0, -1)
}

const parseBody = obj => {
	if (!obj) return {}
	for (const propName in obj) {
		if (obj[propName] === null || obj[propName] === undefined) {
			delete obj[propName]
		}
	}
	return obj
}

export const setup = (protocol, host, port) => {
	httpProtocol = protocol
	hostName = host
	portNumber = port
}