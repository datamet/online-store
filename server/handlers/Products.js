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
	const sortedList = await db.getProductsSorted()
	const listLength = sortedList.length
	const start = req.query.index
	const end = start + 20
	const products = []

	for (let i = start; i < listLength - 1 && i <= end; i++) {
		products.push(sortedList[i])
	}

	const response = {
		products
	}

	if (end+1 < products.length) products.next = `/api/v1/products?index=${end + 1}`
	if (start > 0) products.prev = `/api/v1/products?index=${start - 20}`

	res.json(response)
	next()
}

Products.getProduct = async (req, res, next) => {
	const product = await db.getProduct({ _id: req.params.product_id })
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
	await db.deleteProduct({ _id: req.params.product_id })
	res.json({
		message: 'Product deleted'
	})
	next()
}

module.exports = Products