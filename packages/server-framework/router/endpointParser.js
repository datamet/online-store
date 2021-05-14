/**
 * Purpose: Parse all json api endpoints into js objects
 * with validators, handlers and policies injected
 *
 * Exports: Function that takes endpoints, handlers and policies
 * to parse them to js objects
 */

const { log } = require('../lib/logger')
const { validate } = require('../validation/validator')
const matchesForm = require('./matchesForm')

const setupPolicy = policies => (name, value) => {
	try {
		return policies[name](value)
	} catch (error) {
		log(log.ERROR, `Could not parse policy ${name}`, { error })
	}
}

const parseKeys = (keys, parsePolicy) => {
	const parsed = {}
	for (let [key, value] of Object.entries(keys)) {
		const parsedKey = {
			optional: false,
			default: null,
			values: [],
			policies: []
		}
		if (validate('[config_key]', key)) {
			if (key[0] === '?') {
				parsedKey.optional = true
				key = key.slice(1)
			}
			if (Array.isArray(value)) {
				const obj = value[0]
				const meta = value[1]
				parseKeys.values = parseKeys(obj, parsePolicy)
				if (meta) {
					if ('$default' in meta) parsedKey.default = value.$default
					if ('$policies' in meta && typeof meta.$policies === 'object') {
						for (const [rawPolicy, argument] of Object.entries(meta.$policies)) {
							parsedKey.policies.push(parsePolicy(rawPolicy, argument))
						}
					}
				}
			} else if (typeof value === 'object') {
				let val = false
				if ('$default' in value) {
					parsedKey.default = value.$default
					val = true
				}
				if ('$value' in value || '$values' in value) {
					if (value.$values && Array.isArray(value.$values)) parsedKey.values = value.$values
					else parsedKey.values = [value.$value]

					if ('$policies' in value && typeof value.$policies === 'object') {
						for (const [rawPolicy, argument] of Object.entries(value.$policies)) {
							parsedKey.policies.push(parsePolicy(rawPolicy, argument))
						}
					}
					val = true
				}
				if (!val) {
					parsedKey.keys = parseKeys(value, parsePolicy)
				}
			} else {
				parsedKey.values = [value]
			}
			parsed[key] = parsedKey
		}
	}
	return parsed
}

const setupHandlers = handlers => rawHandler => {
	const [entity, action] = rawHandler.split('.')
	try {
		return handlers[entity][action]
	} catch (error) {
		log(log.ERROR, `Could not parse handler ${rawHandler}`, { error })
	}
}

const parsePathVariables = (rawPath) => {
	const variables = {}
	const splitPath = rawPath.split('/')
	for (const segment of splitPath) {
		if (segment[0] === ':') {
			key = segment.slice(1)
			variables[key] = segment
		}
	}
	return variables
}

const endpointParser = (handlers, policies) => raw => {
	let parsePolicy = setupPolicy(policies)
	let parseHandler = setupHandlers(handlers)
	let parsed = {
		method: 'get',
		path: '/',
		policies: []
	}
	try {
		if (validate('[method]', raw.method)) parsed.method = raw.method
		if (validate('[path]', raw.path)) {
			const pathVariables = parsePathVariables(raw.path)
			parsed.params = parseKeys(pathVariables, parsePolicy)
			parsed.path = raw.path
			parsed.policies.unshift(matchesForm(parsed.params, 'params'))
		}
		if (raw.handler) {
			if (validate('[handler]', raw.handler)) {
				parsed.handler = parseHandler(raw.handler)
				if (!parsed.handler) parsed.handler = (req, res, next) => {
					next()
				}
			}
		}
		else {
			parsed.handler = (req, res, next) => {
				res.json({ message: 'ok' })
				next()
			}
		}
		if (typeof raw.policies === 'object') {
			for (const [rawPolicy, value] of Object.entries(raw.policies)) {
				parsed.policies.push(parsePolicy(rawPolicy, value))
			}
		}
		if (typeof raw.query === 'object') {
			parsed.query = parseKeys(raw.query, parsePolicy)
			parsed.policies.unshift(matchesForm(parsed.query, 'query'))
		}
		if (typeof raw.body === 'object') {
			parsed.body = parseKeys(raw.body, parsePolicy)
			parsed.policies.unshift(matchesForm(parsed.body, 'body'))
		}
		return parsed
	} catch (error) {
		log(log.ERROR, `Could not parse ${raw.method ? raw.method.toUpperCase() : ''} ${raw.path ? raw.path : 'endpoint'}`, { error })
	}
	return null
}

const endpointsParser = (rawEndpoints, handlers, policies) => {
	const parseEndpoint = endpointParser(handlers, policies)
	return rawEndpoints.map(raw => parseEndpoint(raw)).filter(endpoint => endpoint !== null)
}

module.exports = endpointsParser