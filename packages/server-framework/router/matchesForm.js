const error = require('../lib/error')
const { validate } = require('../validation/validator')

const setupMatchFrom = (req, res) => async (form, matchedValue) => {
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
            else if (Array.isArray(meta.values)) {
                for (const format of meta.values) {
                    try {
                        validate(format, matchedValue[key])
                        const policies = [...meta.policies]

                        // muligens feil for flere policies
                        const next = async (error) => {
                            if (error) throw error
                            const policy = policies.shift()
                            if (policy) await policy(req, res, next)
                        }
                        await next()

                        match = true
                        break
                    }
                    catch (error) {
                        errorToThrow = error
                    }
                }
            }
            else {
                try {
                    for (const entry of matchedValue[key]) {
                        const matchFromRecursive = setupMatchFrom(req, res)
                        matchFromRecursive(meta.values, entry)
                    }
                    const policies = [...meta.policies]
    
                    // muligens feil for flere policies
                    const next = async (error) => {
                        if (error) throw error
                        const policy = policies.shift()
                        if (policy) await policy(req, res, next)
                    }
                    await next()
                    
                    match = true
                    break
                }
                catch (error) {
                    errorToThrow = error
                }
            }
            if (!match) throw errorToThrow
        }
        else if (meta.optional) {
            if (meta.default !== undefined) matchedValue[key] = meta.default
        }
        else {
            throw error.missing()
        }
    }
}

const matchesFrom = (form, toMatch) => async (req, res, next) => {
    const matchFormRecursive = setupMatchFrom(req, res)
    
    try {
        const matchedValue = req[toMatch]
        await matchFormRecursive(form, matchedValue)
    }
    catch (error) {
        next(error)
    }
    next()
}

module.exports = matchesFrom