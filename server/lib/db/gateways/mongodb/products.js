const gateway = {}

gateway.createProduct = async (db, product) => {
	await db.collection('products').insertOne(product)
}

gateway.getProducts = async db => {
	return await db.collection('products').find().toArray()
}

gateway.deleteAllProducts = async db => {
	await db.collection('products').drop()
}

gateway.getProduct = async (db, { _id }) => {
	return await db.collection('products').find({ _id })
}

gateway.updateProduct = async (db, { _id }) => {
	return await db.collection('products').updateOne()
}

gateway.deleteProduct = async (db, { _id }) => {
	await db.collection('products').deleteOne({ _id })
}

module.exports = gateway