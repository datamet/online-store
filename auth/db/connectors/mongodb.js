const { MongoClient } = require('mongodb')
const { db_protocol, db_uri, db_host, db_port, db_username, db_password, db_name } = require('../../../serverconfig')

let uri = db_uri.replace('<protocol>', db_protocol)
	uri = 	 uri.replace('<host>', db_host)
	uri = 	 uri.replace('<port>', db_port)
	uri = 	 uri.replace('<username>', db_username)
	uri = 	 uri.replace('<password>', db_password)

let db

const connect = async () => {
	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	db = client.db(db_name)
}

const get = () => {
	if (!db) throw new Error("Database is not conneced")
	return db
}

module.exports = { connect, get }