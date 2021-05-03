const gateway = {}

gateway.createProduct = async (db, product) => {
	await db.collection('products').insertOne(product)
}

gateway.getProducts = async db => {
	return await db.collection('products').find().toArray()
}

gateway.getProductsSorted = async db => {
	return await db.collection('products').find().sort({ name: 1 }).toArray()
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

gateway.getProductsFiltered = async (db, { keywords, searchQuery }) => {
	if (searchQuery && keywords) {
		return await db.collection('products').find(
			{ $text: { $search: searchQuery } },
			{ score: { $meta: 'textScore' } }
		).sort({
				score: { $meta: 'textScore' }
			}
		).find({
			keywords: {
				$in: keywords
			}
		})
	} else if (searchQuery) {
		return await db.collection('products').find(
			{ $text: { $search: searchQuery } },
			{ score: { $meta: 'textScore' } }
		).sort({
				score: { $meta: 'textScore' }
			}
		)
	} else if (keywords) {
		return await db.collection('products').find({
			keywords: {
				$in: keywords
			}
		})
	} else {
		return await gateway.getProductsSorted(db)
	}
}

module.exports = gateway