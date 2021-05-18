const ObjectId = require("mongodb").ObjectID
const gateway = {}

gateway.createOrder = async (db, { order }) => {
	const res = await db.collection('orders').insertOne(order)
	if (order.user)
		await db
			.collection('users')
			.updateOne({ _id: ObjectId(order.user) }, { $push: { owns: res.insertedId } })
	else await db.collection('noowner').insertOne({ entity: res.insertedId })
	return res.insertedId
}

gateway.getOrders = async db => {
	return await db.collection('orders').find().toArray()
}

gateway.getOrdersFromUser = async (db, { _id }) => {
	return await db.collection('orders').find({ user: _id }).toArray()
}

gateway.getOrder = async (db, { _id }) => {
	return await db.collection('orders').findOne({ _id: ObjectId(_id) })
}

gateway.deleteOrder = async (db, { _id }) => {
	const res = await db.collection('orders').deleteOne({ _id: ObjectId(_id) })
	return res.deletedCount > 0
}

gateway.getOrderStats = async db => {
	const res = await db.collection('orders').aggregate([
		{
			$group: {
				_id: null,
				number_of_orders: {
					$sum: 1
				},
				total_revenue: {
					$sum: "$total_price"
				},
				revenue_before_cupons: {
					$sum: "$price_before_discount"
				},
				products_sold: {
					$sum: "$sold"
				}
			}
		}
	]).toArray()
	const stats = res[0]
	return stats
}

module.exports = gateway
