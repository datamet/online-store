const users = require('./users')
const tokens = require('./tokens')
const hashes = require('./hashes')

module.exports = { ...users, ...tokens, ...hashes }