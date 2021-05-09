const users = require('./users')
const products = require('./products')
const checkout = require('./checkout')
const discounts = require('./discounts')
const orders = require('./orders')

const gateway = {
	...users,
	...products,
	...checkout,
	...discounts,
	...orders
}

module.exports = gateway