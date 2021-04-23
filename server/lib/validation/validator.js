/**
 * Exports: Validate function that matches a format
 * with a value.
 */

const error = require('../error')
const types = require('./types')

// Map of accepted formats and how to validate them
const formats = new Map()

formats.set(
	format => matchRegex('type', format) ? format.slice(1, -1) : false,
	(type, value) => matchRegex(type, value)
)

formats.set(
	format => matchRegex('type_array', format) ? format.slice(1, -1) : false,
	(type, values) => {
        if (!Array.isArray(values)) throw error.bad()
        values.map(value => matchRegex(type, value))
    }
)

formats.set(
	format => matchRegex('path_variable', format) ? format.slice(1) : false,
	(type, value) => matchRegex(type, value)
)

const matchRegex = (type, value) => {
    t = types[type]
    if (!t) throw error.config()
	const matches = value.match(new RegExp(t.regex))
	if (!matches) throw error.custom(400, t.error)
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
