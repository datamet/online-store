const { error } = require('server-framework')
const fs = require('fs').promises
const uuid = require('./uuid')
const path = require('path')
const { public_host } = require('../config')

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
		const [ type, ext ] = img.type.split('/')
		const filename = `${uuid()}.${ext}`
		const regex = new RegExp(`^data:${type}\/${ext};base64,`, 'gi')
		const base64Image = img.image.replace(regex, '')
		const buffer = Buffer.from(base64Image, 'base64')
		await saveFile(path.resolve(__dirname, `../usercontent/${filename}`), buffer)
		urls.push(`http://${public_host}/usercontent/${filename}`)
	}
	return urls
}

module.exports = { saveFile, saveImages }