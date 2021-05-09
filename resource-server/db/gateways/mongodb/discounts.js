const ObjectId = require("mongodb").ObjectID
const gateway = {}

gateway.createDiscount = async (db, { discount, owner }) => {
    const { code, percent } = discount
	const res = await db.collection('discounts').insertOne({ code, exp, products, user, owner, percent })
	await db.collection('users').updateOne({ _id: ObjectId(owner) }, { $push: { owns: res.insertedId } })
}

gateway.getDiscounts = async db => {
	const discounts = await db.collection('discounts').find().toArray()
	if (!discounts) return false
	return discounts
}

gateway.verifyDiscount = async (db, { code }) => {
	const discount = await db.collection('discounts').find({ code })
	const count = await discount.count()
	const arr = await discount.toArray()
	if (count > 0) return { valid: true, percent: arr[0].percent }
	return { valid: false }
}

module.exports = gateway