const { db } = require('../lib/db')
const { inGroup } = require('../lib/middleware/policies/inGroup')

const Orders = {}

Orders.createOne = async (req, res, next) => {
	const products = req.body.products.map(product => {
		const [product_id, amount] = product.split(":")

		return {
			product_id,
			amount
		}
	})

	const order = {
		buyer: req.body.buyer,
		products,
		order_note: req.body.order_note,
		address: {
			country: req.body.address.country,
			province: req.body.address.province,
			city: req.body.address.city,
			zip: req.body.address.zip,
			street_name: req.body.address.street_name,
			street_number: req.body.address.street_number
		}
	}

	await db.createOrder(order)

	res.json({
		message: 'Order created'
	})
	next()

}

Orders.getOne = async (req, res, next) => {
	const order = await db.getOrder({ _id: req.params.order_id })
	res.json(order)
	next()
}

Orders.getMultiple = async (req, res, next) => {
	let orders = []
	const user_id = req.query.user_id

	if (user_id) {
		orders = await db.getOrdersFromUser({ _id: user_id })
	} else if (inGroup(req.user._id, ['admin'])) {
		orders = await db.getOrders()
	}

	res.json(orders)
	next()
}

Orders.deleteOne = async (req, res, next) => {
	await db.deleteOrder({ oerder_id: req.params.order_id })
	res.json({
		message: 'Order deleted'
	})
	next()
}

module.exports = Orders