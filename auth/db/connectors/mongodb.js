const { MongoClient } = require('mongodb')
const { config } = require('../../../server-base')

let uri = config.db_uri.replace('<protocol>', config.db_protocol)
	uri = 	 uri.replace('<host>', config.db_host)
	uri = 	 uri.replace('<port>', config.db_port)
	uri = 	 uri.replace('<username>', config.db_username)
	uri = 	 uri.replace('<password>', config.db_password)

let db

const connect = async () => {
	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	db = client.db(config.db_name)
}

const get = () => {
	if (!db) throw new Error("Database is not conneced")
	return db
}

module.exports = { connect, get }