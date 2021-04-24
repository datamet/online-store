/**
 * Exports: Validate function that matches a format
 * with a value.
 */

const error = require('../error')
const types = require('./types')

// Map of accepted formats and how to validate them
const formats = new Map()

formats.set(
	format => matchType('type', format, { noerror: true }) ? format.slice(1, -1) : false,
	(type, value) => matchType(type, value)
)

formats.set(
	format => matchType('type_array', format, { noerror: true }) ? format.slice(1, -1) : false,
	(type, values) => {
        if (!Array.isArray(values)) throw error.bad()
        values.map(value => matchType(type, value))
        return true
    }
)

formats.set(
	format => matchType('path_variable', format, { noerror: true }) ? format.slice(1) : false,
	(type, value) => matchType(type, value)
)

const matchType = (type, value, options) => {
    typeObj = types[type]
    if (!typeObj) throw error.config()

    if (Array.isArray(typeObj)) {
        for (const requirement of typeObj) {
            matchRegex(requirement, value, options)
        }
        return true
    }
    return matchRegex(typeObj, value, options)
}

const matchRegex = (type, value, options) => {
    const noerror = options ? options.noerror : false
	const matches = value.match(new RegExp(type.regex))
	if (!matches) {
        if (!noerror) throw error.custom(400, type.error)
        else return false
    }
	else return true
}

// Exported validate function
const validate = (format, value) => {
    if (!format) throw error.config()
    if (!value) throw error.bad()
    if (typeof format === 'string') {
        for (const [isFormat, validator] of formats) {
            const matchesFormat = isFormat(format)
            if (matchesFormat) return validator(matchesFormat, value)
        }
    }
    return format.toString() === value.toString()
}

module.exports = validate
