const gateway = {}

gateway.createCartItem = async (db, { user_id, product_id, amount }) => {
	await db.collection('users').updateOne({ _id: user_id }, { $push: { cart: { product_id, amount } } })
}

gateway.getCartItems = async (db, { _id }) => {
	return await db.collection('users').find({ _id }).toArray()
}

gateway.updateCartItem = async (db, { user_id, product_id }) => {
	return await db.collection('users').updateOne()
}

gateway.deleteCartItem = async (db, { _id, product_id }) => {
	const cart = db.collection('users').find({_id}, { cart: 1 })
	await db.collection('products').updateOne({ _id: product_id }, { $inc: {amount: item.amount} })
	await db.collection('users').updateOne({ _id }, { $pull: { cart: product_id } })
}

gateway.deleteCartItems = async (db, { _id }) => {
	const items = await gateway.getCartItems(db, { _id })
	for (const item of items) {
		await db.collection('products').updateOne({ _id: item.product_id }, { $inc: {amount: item.amount} })
	}
	await db.collection('users').updateOne({ _id }, { cart: [] })
}

module.exports = gateway