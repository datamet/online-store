const crypto = require('crypto')
const { error } = require('server-framework')

const hash = {}

hash.create = secret => {
    const salt = hash.randomStr(10)
    const newHash = crypto.createHmac('sha256', 'secret').update(`${salt}${secret}`).digest('hex')
    return `sha256$hex$${salt}$${newHash}`
}

hash.compare = (hash, secret) => {
    const [ scheme, encoding, salt, hash_value ] = hash.split('$')
    const compare_hash = crypto.createHmac(scheme, 'secret').update(`${salt}${secret}`).digest(encoding)
    if (hash_value !== compare_hash) throw error.credentials()
    return true
}

hash.randomStr = length => {
	return crypto.randomBytes(length).toString('hex')
}

module.exports = hash
