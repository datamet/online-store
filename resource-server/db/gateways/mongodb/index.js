const users = require('./users')
const products = require('./products')
const cartItems = require('./cartItems')
const orders = require('./orders')

const gateway = {
	...users,
	...products,
	...cartItems,
	...orders
}

module.exports = gateway