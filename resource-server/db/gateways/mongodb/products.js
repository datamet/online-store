const ObjectId = require("mongodb").ObjectID
const gateway = {}

gateway.createProduct = async (db, { product }) => {
	const res = await db.collection('products').insertOne(product)
	if (!res.insertedId) return false
	await db.collection('users').updateOne({ _id: ObjectId(product.owner) }, { $push: { owns: res.insertedId } })
	return res.insertedId
}

gateway.getProducts = async db => {
	return await db.collection('products').find().toArray()
}

gateway.getProductsSorted = async db => {
	return await db.collection('products').find().sort({ name: 1 }).toArray()
}

gateway.getProduct = async (db, { _id }) => {
	return await db.collection('products').findOne({ _id: ObjectId(_id) })
}

gateway.updateProduct = async (db, { _id, updatedInfo }) => {
	const res = await db.collection('products').updateOne({ _id: ObjectId(_id) }, { $set: updatedInfo })
	return res.modifiedCount > 0
}

gateway.getProductPrice = async (db, { _id }) => {
	const product = await db.collection('products').findOne({ _id: ObjectId(_id) })
	if (!product) return null
	return product.price
}

gateway.deleteProduct = async (db, { _id }) => {
	const product = await db.collection('products').findOneAndDelete({ _id: ObjectId(_id) })
	if (!product) return false
	await db.collection('users').updateOne({ _id: ObjectId(product.owner) }, { $pull: { owns: _id } })
	return true
}

gateway.getProductsFiltered = async (db, { keywords, search }) => {
	if (search && keywords) {
		return await db.collection('products').find(
			{ $text: { $search: search }, keywords: { $in: keywords } },
			{ score: { $meta: 'textScore' } }
		).sort({
				score: { $meta: 'textScore' }
			}
		).toArray()
	} else if (search) {
		return await db.collection('products').find(
			{ $text: { $search: search } },
			{ score: { $meta: 'textScore' } }
		).sort({
				score: { $meta: 'textScore' }
			}
		).toArray()
	} else if (keywords) {
		return await db.collection('products').find({
			keywords: {
				$in: keywords
			}
		}).toArray();
	} else {
		const products = await gateway.getProductsSorted(db)
		return products
	}
}

gateway.getProductKeywords = async db => {
	return db.collection('products').aggregate([
		{$unwind:"$keywords"},
		{$group:{_id:null, kwrds: {$addToSet : "$keywords"} }},
		{$project:{_id:0, keywords: "$kwrds"}}
	]).toArray()
}

module.exports = gateway