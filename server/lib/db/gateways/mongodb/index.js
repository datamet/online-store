const users = require('./users')
const products = require('./products')

const gateway = {
	...users,
	...products
}

module.exports = gateway