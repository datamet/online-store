const { MongoClient } = require('mongodb')
const { db_protocol, db_user, db_pwd, db_host, db_port, db_name } = require('../../config')

let uri = `${db_protocol}://${db_user}:${db_pwd}@${db_host}:${db_port}/${db_name}`

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