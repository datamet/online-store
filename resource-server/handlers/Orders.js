const { db, error } = require('server-framework')
const { inGroup } = require('../policies/inGroup')
const { discountPrice } = require('../lib/discount')
const {
	validateCheckoutSession,
	validatePaymentToken,
} = require('../lib/checkout')

const Orders = {}

Orders.createOne = async (req, res, next) => {
	const checkout_session = await validateCheckoutSession(
		req.body.checkout_session,
		req.user._id
	)
	const payed = await validatePaymentToken(req.body.payment_token)

	let total_price = 0
	const products = await Promise.all(
		checkout_session.products.map(async ({ product_id, amount }) => {
			const [pricePerUnit, name] = await db.sellProduct({
				_id: product_id,
				amount,
			})
			const price = pricePerUnit * amount
			if (!price) throw error.internal()
			total_price += price

			return {
				product_id,
				name,
				price,
				amount,
			}
		})
	)

	let dateFormat = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	let now = new Date()

	const order = {
		total_price,
		products,
		payment_token: req.body.payment_token,
		payed,
		date: now.toLocaleDateString('en-US', dateFormat),
		status: 'order placed',
		address: {
			country: req.body.address.country,
			province: req.body.address.province,
			city: req.body.address.city,
			zip: req.body.address.zip,
			street: req.body.address.street,
		},
	}

	if (req.user._id) order.user = req.user._id
	if (req.body.note) order.note = req.body.note
	if (req.body.cupon) {
		const cupon = await db.verifyDiscount({ code: req.body.cupon })
		if (!cupon.valid)
			throw error.custom(
				401,
				`Cupon code: ${req.body.code} is not a valid cupon`
			)
		order.cupon = req.body.cupon
		order.discount = cupon.percent
		let newTotalPrice = 0
		order.products.map(product => {
			const newPrice = discountPrice(product.price, cupon.percent)
			product.price = newPrice
			newTotalPrice += newPrice
			return product
		})
		order.price_before_discount = order.total_price
		order.total_price = newTotalPrice
	}

	const order_id = await db.createOrder({ order })
	if (!order_id) throw error.internal()

	res.json({ message: 'Order placed', order_id })
	next()
}

Orders.getOne = async (req, res, next) => {
	const order = await db.getOrder({ _id: req.params.order_id })
	if (!order) throw error.custom(404, 'Order does not exist')
	res.json({ order })
	next()
}

Orders.getMultiple = async (req, res, next) => {
	let orders = []
	const user_id = req.query.user_id

	if (user_id) {
		orders = await db.getOrdersFromUser({ _id: user_id })
	} else if (inGroup(req.user._id, ['admin'])) {
		orders = await db.getOrders()
	} else throw error.unauthorized()
	if (!orders) throw error.internal()

	res.json({ orders })
	next()
}

Orders.deleteOne = async (req, res, next) => {
	const deleted = await db.deleteOrder({ order_id: req.params.order_id })
	if (!deleted) throw error.custom(404, 'Could not delete order')
	res.json({ message: 'Order deleted' })
	next()
}

Orders.getStatistics = async (req, res, next) => {
	let stats = await db.getOrderStats()
	if (!stats) stats = {}
	if (!stats.number_of_orders) stats.number_of_orders = 0
	if (!stats.total_revenue) stats.total_revenue = 0
	if (!stats.revenue_before_cupons) stats.revenue_before_cupons = 0
	if (!stats.products_sold) stats.products_sold = 0

	res.json({ statistics: stats })
	next()
}

module.exports = Orders
