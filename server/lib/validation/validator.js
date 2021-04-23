const error = require('../error')
const types = require('./types')

const firstAndLast = (str, first, last) => {
    if (str[0] === first && str[str.length - 1] === last) return true
    else return false
}

const matchRegex = (value, type) => {
    const matches = value.match(new RegExp(type.regex))
    if (!matches) throw error.custom(400, type.error)
    else return true
}

const validate = (value, type) => {
    if (Array.isArray(type)) {
        for (const requirement of type) {
            matchRegex(value, requirement)
        }
        return true
    }
    return matchRegex(value, type)
}

const validator = (format = "", value) => {
    if (firstAndLast(format, '[', ']')) {
        value = value.toString()
        const type = types[format.slice(1, -1)]
        return validate(value, type)
    }
    else if (firstAndLast(format, '<', '>')) {
        if (Array.isArray(value)) {
            for (const element of value) {
                const subFormat = format.replace('<', '[').replace('>', ']')
                validator(subFormat, element)
            }
            return true
        }
        throw error.bad()
    }
    else if (format[0] === ':') {
        value = value.toString()
        const type = types[format.slice(1)]
        return validate(value, type)
    }
    
    value = value.toString()
    const type = types[format]
    return validate(value, type)
}

module.exports = validator