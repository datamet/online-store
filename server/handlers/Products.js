const { db } = require('../lib/db')

const Products = {}

Products.createOne = async (req, res, next) => {
	const newProduct = {
		name: req.body.name,
		price: req.body.price,
		keywords: req.body.keywords,
		short_desc: req.body.short_desc,
		long_desc: req.body.long_desc
	}

	await db.createProduct(newProduct)
	res.json({
		message: 'Created product'
	})
	next()
}

Products.getMultiple = async (req, res, next) => {
	const products = await db.getProducts()
	res.json(products)
	next()
}

Products.getProduct = async (req, res, next) => {
	const product = await db.getProduct({ _id: req.params.productID })
	res.json(product)
	next()
}

Products.updateOne = async (req, res, next) => {

}

Products.deleteMultiple = async (req, res, next) => {
	await db.deleteAllProducts()
	res.json({
		message: 'Deleted all products'
	})
	next()
}

Products.deleteOne = async (req, res, next) => {
	await db.deleteProduct({ _id: req.params.productID })
	res.json({
		message: 'Product deleted'
	})
	next()
}

module.exports = Products