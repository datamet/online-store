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
	const count = req.query.count
	const start = req.query.index
	const end = start + count
	const search = req.query.search
	const rawKeywords = req.query.keywords
	const keywords = rawKeywords.split('%2c')

	let products = await db.getProductsFiltered({keywords, search})

	products = products.slice(start, end)

	const response = {
		products
	}

	if (end < products.length) {
		response.next = `/api/v1/products?index=${end}&count=${count}`
		if (rawKeywords) response.next = `${response.next}&keywords=${rawKeywords}`
		if (search) response.next = `${response.next}&search=${search}`
	}

	if (start > 0) {
		response.prev = `/api/v1/products?index=${Math.max(0, start - count)}`
		if (rawKeywords) response.prev = `${response.prev}&keywords=${rawKeywords}`
		if (search) response.prev = `${response.prev}&search=${search}`
	}

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

Products.deleteOne = async (req, res, next) => {
	await db.deleteProduct({ _id: req.params.product_id })
	res.json({
		message: 'Product deleted'
	})
	next()
}

module.exports = Products