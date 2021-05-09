const ObjectId = require("mongodb").ObjectID
const gateway = {}

gateway.createOrder = async (db, { order }) => {
	const res = await db.collection('orders').insertOne(order)
	if (order.user)
		await db
			.collection('users')
			.updateOne({ _id: ObjectId(order.user) }, { $push: { owns: res.insertedId } })
	return res.insertedId
}

gateway.getOrders = async db => {
	return await db.collection('orders').find().toArray()
}

gateway.getOrdersFromUser = async (db, { _id }) => {
	return await db.collection('orders').find({ user: ObjectId(_id) }).toArray()
}

gateway.getOrder = async (db, { _id }) => {
	return await db.collection('orders').findOne({ _id: ObjectId(_id) })
}

gateway.deleteOrder = async (db, { _id }) => {
	const res = await db.collection('orders').deleteOne({ _id: ObjectId(_id) })
	return res.deletedCount > 0
}

module.exports = gateway
