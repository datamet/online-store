const gateway = {}

gateway.createCartItem = async (db, product) => {
	await db.collection('orders').insertOne(product)
}

gateway.getCartItems = async db => {
	return await db.collection('orders').find().toArray()
}

gateway.updateCastItem = async (db, { _id }) => {
	return await db.collection('orders').updateOne()
}

gateway.deleteCartItem = async (db, { _id }) => {
	await db.collection('orders').deleteOne({ _id })
}

module.exports = gateway