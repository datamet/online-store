const { error } = require('server-framework')
const fs = require('fs').promises
const uuid = require('./uuid')
const path = require('path')

const saveFile = async (path, buffer) => {
	try {
		await fs.writeFile(path, buffer)
		return true
	}
	catch(err) {
        const segments = path.split('/')
        const filename = segments[segments.length - 1]
		log(log.DEBUG, `An error occured while saving ${filename}`, { error: err })
		throw error.custom(422, `Image has an invalid format`)
	}
}

const saveImages = async images => {
	const urls = []

	for (const img of images) {
		const filename = `${uuid()}.${img.type}`
		const base64Image = img.image.replace(/^data:image\/png;base64,/, '')
		const buffer = Buffer.from(base64Image, 'base64')
		await saveFile(path.resolve(__dirname, `../usercontent/${filename}`), buffer)
		urls.push(`http://localhost/usercontent/${filename}`)
	}
	return urls
}

module.exports = { saveFile, saveImages }