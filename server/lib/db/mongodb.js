const { MongoClient } = require('mongodb')
const log = require('../logger')
const { db_protocol, db_uri, db_host, db_port, db_username, db_password, db_name } = require('../../serverconfig')

let uri = db_uri.replace('<protocol>', db_protocol)
	uri = 	 uri.replace('<host>', db_host)
	uri = 	 uri.replace('<port>', db_port)
	uri = 	 uri.replace('<username>', db_username)
	uri = 	 uri.replace('<password>', db_password)
	uri = 	 uri.replace('<database>', db_name)

const connect = async collection => {
	try {
		const db = await MongoClient.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		log(log.DB, `Connected to mongodb at ${db_host}:${db_port}`)
		return await db.collection(collection)
	}
	catch (error) {
		console.log(uri)
		log(log.ERROR, `Cannot connect to database`, { error })
		return null
	}
}

module.exports = connect