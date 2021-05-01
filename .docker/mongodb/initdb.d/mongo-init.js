// use shell command to save env variable to a temporary file, then return the contents.
// source: https://stackoverflow.com/questions/39444467/how-to-pass-environment-variable-to-mongo-script/60192758#60192758
function getEnvVariable(envVar, defaultValue) {
	var command = run(
		'sh',
		'-c',
		`printenv --null ${envVar} >/tmp/${envVar}.txt`
	)
	// note: 'printenv --null' prevents adding line break to value
	if (command != 0) return defaultValue
	return cat(`/tmp/${envVar}.txt`)
}

// create application user and collection
var dbUser = getEnvVariable('DB_USER', 'regularuser')
var dbPwd = getEnvVariable('DB_PWD', 'regularuser()')
var dbName = getEnvVariable('DB_NAME', 'production')
db = db.getSiblingDB(dbName)

// Create full access user and limited access user
// The limited access user should not be able to retrieve
// hashes from the database
// db.createRole({
//     privileges: [
//         { resource: { db: "products", collection: "inventory" }, actions: [ "find", "update", "insert" ] },
//         { resource: { db: "products", collection: "orders" },  actions: [ "find" ] }
//       ]
// })

// db.createUser({
// 	'user': dbUser,
// 	'pwd': dbPwd,
// 	'roles': [
// 		{
// 			'role': 'dbOwner',
// 			'db': getEnvVariable('DB_NAME', 'production'),
// 		},
// 	],
// })

db.createUser({
	'user': dbUser,
	'pwd': dbPwd,
	'roles': [
		{
			'role': 'dbOwner',
			'db': getEnvVariable('DB_NAME', 'production'),
		},
	],
})

db.createCollection('users').createIndex({ email: 1 }, { unique: true })
