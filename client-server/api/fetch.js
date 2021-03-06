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
		const parsedBody = parseBody(body)
		const url = `${httpProtocol}://${hostName}${portNumber ? `:${portNumber}` : ''}${path}${parseQuery(query)}`

		const response = await fetch(url, {
			method,
			headers: parseHeader(headers, parsedBody, method),
			body: method === 'POST' || method === 'PUT' ? JSON.stringify(parsedBody) : null
		})

		if (response.headers.get('Content-Type') === 'text/html') {
			console.log(await response.text())
		}

		if (response.headers.get('Content-Type') === 'application/json; charset=utf-8') {
			res.body = await response.json()
			res.status = response.status
			return res
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
	return { body: { error: { message: 'Something went wrong' } } }
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