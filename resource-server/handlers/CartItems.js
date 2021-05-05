const { db } = require('../lib/db')

const CartItems = {}

CartItems.createOne = async (req, res, next) => {
	await db.createCartItem({
		user_id: req.params.user_id,
		product_id: req.body.product_id,
		amount: req.body.amount
	})
	res.json({
		message: 'Item cart created'
	})
	next()
}

CartItems.getMultiple = async (req, res, next) => {
	const cartItems = await db.getCartItems({ user_id: req.params.user_id })
	res.json({ cart: cartItems })
	next()
}

CartItems.updateOne = async (req, res, next) => {
	await db.updateCartItem({
		user_id: req.params.user_id,
		product_id: req.params.product_id
	})
	res.json({
		message: 'Updated cart item'
	})
	next()
}

CartItems.deleteOne = async (req, res, next) => {
	await db.deleteCartItem({
		user_id: req.params.user_id,
		product_id: req.params.product_id
	})
	res.json({
		message: 'Deleted cart item'
	})
	next()
}

CartItems.deleteMultiple = async (req, res, next) => {
	await db.deleteCartItem({ _id: req.params.user_id })
	res.json({
		message: 'Deleted cart item'
	})
	next()
}

module.exports = CartItems