const gateway = {}

gateway.createOrder = async (db, order) => {
	await db.collection('orders').insertOne(order)
}

gateway.getOrders = async db => {
	return await db.collection('orders').find().toArray()
}

gateway.getOrdersFromUser = async (db, { _id }) => {
	return await db.collection('orders').find({ _id }).toArray()
}

gateway.getOrder = async (db, { _id }) => {
	return await db.collection('orders').find({ _id })
}

gateway.updateOrder = async (db, { _id }) => {
	return await db.collection('orders').updateOne()
}

gateway.deleteOrder = async (db, { _id }) => {
	await db.collection('orders').deleteOne({ _id })
}

module.exports = gateway