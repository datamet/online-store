const crypto = require('crypto')
const { error } = require('server-framework')
const { hashing_secret } = require('../config')

const hash = {}

hash.create = secret => {
    const salt = hash.randomStr(10)
    const newHash = crypto.createHmac('sha256', hashing_secret).update(`${salt}${secret}`).digest('hex')
    return `sha256$hex$${salt}$${newHash}`
}

hash.compare = (hash, secret) => {
    if (!hash) throw error.unauthorized()
    const [ scheme, encoding, salt, hash_value ] = hash.split('$')
    const compare_hash = crypto.createHmac(scheme, hashing_secret).update(`${salt}${secret}`).digest(encoding)
    if (hash_value !== compare_hash) throw error.credentials()
    return true
}

hash.randomStr = length => {
	return crypto.randomBytes(length).toString('hex')
}

module.exports = hash
