const { MongoClient } = require('mongodb')
const { db_protocol, db_host, db_port, db_user, db_pwd, db_name } = require('../../config')

let uri = `${db_protocol}://${db_user}:${db_pwd}@${db_host}:${db_port}/${db_name}`

let db

const dbconnect = async () => {
	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	db = client.db(db_name)
}

const getDB = () => {
	if (!db) throw new Error("Database is not conneced")
	return db
}

module.exports = { dbconnect, getDB }