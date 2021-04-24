const error = require('../../error')
const validate = require('../../validation/validator')

const setupMatchFrom = (req, res) => (form, matchedValue) => {
    if (!matchedValue || typeof matchedValue !== 'object') throw error.missing()
    for (const [key, meta] of Object.entries(form)) {
        if (matchedValue[key]) {
            let errorToThrow
            let match = false
            if (meta.keys) {
                try {
                    const matchFromRecursive = setupMatchFrom(req, res)
                    matchFromRecursive(meta.keys, matchedValue[key])
                    match = true
                }
                catch (error) {
                    errorToThrow = error
                }
            }
            else {
                for (const format of meta.values) {
                    try {
                        validate(format, matchedValue[key])
                        const policies = [...meta.policies]
                        
                        const next = (error) => {
                            if (error) throw error
                            const policy = policies.shift()
                            if (policy) policy(req, res, next)
                        }
                        next()

                        match = true
                        break
                    }
                    catch (error) {
                        errorToThrow = error
                    }
                }
            }
            if (!match) throw errorToThrow
        }
        else if (meta.optional) {
            if (meta.default) matchedValue[key] = meta.default
        }
        else {
            throw error.missing()
        }
    }
}

const matchesFrom = (form, toMatch) => (req, res, next) => {
    const matchFormRecursive = setupMatchFrom(req, res)
    
    try {
        const matchedValue = req[toMatch]
        matchFormRecursive(form, matchedValue)
    }
    catch (error) {
        next(error)
    }
    next()
}

module.exports = matchesFrom