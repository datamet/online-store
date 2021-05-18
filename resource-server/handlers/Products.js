const { db, error, log } = require('server-framework')

const Products = {}

Products.createOne = async (req, res, next) => {
	const product = {
		name: req.body.name,
		price: parseInt(req.body.price),
		stock: parseInt(req.body.stock),
		availability: parseInt(req.body.stock),
		keywords: req.body.keywords,
		short_desc: req.body.short_desc,
		long_desc: req.body.long_desc,
		owner: req.user._id
	}

	const product_id = await db.createProduct({ product })
	if (!product_id) throw error.internal()
	res.json({
		message: 'Created product',
		product_id
	})
	next()
}

Products.getMultiple = async (req, res, next) => {
	const count = parseInt(req.query.count)
	const start = parseInt(req.query.index)
	const end = start + count
	const search = req.query.search
	let keywords = req.query.keyword
	if (keywords && !Array.isArray(keywords)) keywords = [keywords]
	log(log.DEBUG, `Fetching products that match ${search ? search : 'everything'}.`)
	log(log.DEBUG, `${keywords ? `Keywords: ${keywords.toString()}` : 'Matching all keywords'}.`)

	let products = await db.getProductsFiltered({ keywords, search })
	if (!products) throw error.internal()

	const response = {}

	if (end < products.length) {
		response.next = `/api/v1/products?index=${end}&count=${count}`
		if (keywords) {
			for (const keyword of keywords) {
				response.next = `${response.next}&keyword=${keyword}`	
			}
		}
		if (search) response.next = `${response.next}&search=${search}`
	}

	if (start > 0) {
		response.prev = `/api/v1/products?index=${Math.max(0, start - count)}&count=${count}`
		if (keywords) {
			for (const keyword of keywords) {
				response.prev = `${response.prev}&keyword=${keyword}`	
			}
		}
		if (search) response.prev = `${response.prev}&search=${search}`
	}

	response.products = products.slice(start, end)

	res.json(response)
	next()
}

Products.getOne = async (req, res, next) => {
	const product = await db.getProduct({ _id: req.params.product_id })
	if (!product) throw error.custom(404, 'Product does not exist')
	res.json({ product })
	next()
}

Products.updateOne = async (req, res, next) => {
	const updatedInfo = {}

	if (req.body.name) updatedInfo.name = req.body.name
	if (req.body.price) updatedInfo.price = req.body.price
	if (req.body.keywords) updatedInfo.keywords = req.body.keywords
	if (req.body.short_desc) updatedInfo.short_desc = req.body.short_desc
	if (req.body.long_desc) updatedInfo.long_desc = req.body.long_desc

	const params = {
		updatedInfo,
		_id: req.params.product_id
	}

	const updated = await db.updateProduct(params)
	if (!updated) throw error.custom(404, 'Could not update product')
	res.json({ message: 'Product updated' })
	next()
}

Products.deleteOne = async (req, res, next) => {
	const deleted = await db.deleteProduct({ _id: req.params.product_id })
	if (!deleted) throw error.custom(404, 'Could not delete product')
	res.json({ message: 'Product deleted' })
	next()
}

Products.getKeywords = async (req, res, next) => {
	const keywords = await db.getProductKeywords()
	if (!keywords || !Array.isArray(keywords) || keywords.length === 0) res.json({ keywords: [] })
	else res.json({ keywords: keywords[0].keywords })
	next()
}

module.exports = Products