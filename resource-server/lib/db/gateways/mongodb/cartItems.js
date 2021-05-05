const gateway = {}

gateway.createCartItem = async (db, { user_id, product_id, amount, exp }) => {
	await db.collection('users').updateOne({ _id: user_id }, { $push: { cart: { product_id, amount, exp } } })
}

gateway.getCartItems = async (db, { _id }) => {
	return await db.collection('users').find({ _id }).toArray()
}

gateway.updateCartItem = async (db, { user_id, product_id, amount }) => {
	return await db.collection('users').updateOne({
		_id: user_id,
		'cart.product_id': product_id
	}, { $set: { 'cart.$.amount': amount } })
}

gateway.deleteCartItem = async (db, { _id, product_id }) => {
	const cart = db.collection('users').findOne({ _id, 'cart.product_id': product_id }, { 'cart.$': 1, _id: 0 })
	await db.collection('products').updateOne({ _id: product_id }, { $inc: { amount: cart[0].cart[0].amount } })
	await db.collection('users').updateOne({ _id }, { $pull: { cart: product_id } })
}

gateway.deleteCartItems = async (db, { _id }) => {
	const items = await gateway.getCartItems(db, { _id })
	for (const item of items) {
		await db.collection('products').updateOne({ _id: item.product_id }, { $inc: { amount: item.amount } })
	}
	await db.collection('users').updateOne({ _id }, { cart: [] })
}

module.exports = gateway