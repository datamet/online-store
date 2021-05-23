const { db } = require('server-framework')
const { public_host } = require('../config')

const init = async () => {
    const admin = await db.isEmpty()
    if (!admin) return
    const admin_id = admin._id

    // Create admin user
	await db.createDiscount({
		discount: { code: 'alfred', percent: 100 },
        owner: admin_id
	})

    let product = {
		name: 'navn',
		price: 300,
		stock: 1000,
		availability: 1000,
		keywords: ['keyword', 'otherkeyword'],
		short_desc: 'short description',
		long_desc: 'long description, long description, long description, long description, long description',
		owner: admin_id,
        images: [`http://${public_host}/usercontent/d25e9f3e-661b-40d7-b320-a7aa0022e5cd.png`]
	}

    await db.createProduct({ product })

}

module.exports = init
