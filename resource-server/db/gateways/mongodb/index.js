const users = require('./users')
const products = require('./products')
const checkout = require('./checkout')
const discounts = require('./discounts')
const orders = require('./orders')
const noowner = require('./noowner')

const gateway = {
	...users,
	...products,
	...checkout,
	...discounts,
	...orders,
	...noowner
}

module.exports = gateway