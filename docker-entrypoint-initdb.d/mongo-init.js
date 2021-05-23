// use shell command to save env variable to a temporary file, then return the contents.
// source: https://stackoverflow.com/questions/39444467/how-to-pass-environment-variable-to-mongo-script/60192758#60192758
// function getEnvVariable(envVar, defaultValue) {
// 	var command = run(
// 		'sh',
// 		'-c',
// 		`printenv --null ${envVar} >/tmp/${envVar}.txt`
// 	)
// 	// note: 'printenv --null' prevents adding line break to value
// 	if (command != 0) return defaultValue
// 	return cat(`/tmp/${envVar}.txt`)
// }

// Create full access user and limited access user
// The limited access user should not be able to retrieve
// hashes from the database

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

print('################## Initializing database ##################')
print('### This only happens first time you run the continers ####')

// create application user and collection
var db_auth_user = 'fullaccessuser'
var db_auth_pwd = 'fullaccesspassword'
var db_user = 'regularuser'
var db_pwd = 'regularpassword'

/**
 * Setup production database
 */
db = db.getSiblingDB('production')

db.createCollection('users')
db.createCollection('products')
db.createCollection('orders')
db.createCollection('hashes')
db.createCollection('tokens')
db.createCollection('checkout_sessions')
db.createCollection('discounts')
db.createCollection('noowner')
db.users.createIndex({ email: 1 }, { unique: true })
db.products.createIndex(
	{
	  name: "text",
	  short_desc: "text",
	  long_desc: "text"
	}
)

db.createRole({
	role: 'hashaccess',
	privileges: [
		{
			resource: { db: 'production', collection: 'products' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'hashes' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'orders' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'tokens' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'users' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'checkout_sessions' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'discounts' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'noowner' },
			actions: ['find', 'update', 'insert', 'remove']
		}
	],
	roles: []
})

db.createRole({
	role: 'restricted',
	privileges: [
		{
			resource: { db: 'production', collection: 'products' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'orders' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'tokens' },
			actions: ['find', 'remove']
		},
		{
			resource: { db: 'production', collection: 'users' },
			actions: ['find', 'update', 'remove']
		},
		{
			resource: { db: 'production', collection: 'checkout_sessions' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'discounts' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'production', collection: 'hashes' },
			actions: ['remove']
		},
		{
			resource: { db: 'production', collection: 'noowner' },
			actions: ['find', 'update', 'insert', 'remove']
		}
	],
	roles: []
})

db.createUser({
	'user': db_auth_user,
	'pwd': db_auth_pwd,
	'roles': [
		{
			'role': 'hashaccess',
			'db': 'production'
		}
	]
})

db.createUser({
	'user': db_user,
	'pwd': db_pwd,
	'roles': [
		{
			'role': 'restricted',
			'db': 'production'
		}
	]
})

let hash = 'sha256$hex$11aacb586ae7f8e04cde$adc6114b0ef97f17d55268ffb0c478015db84b0b61ef7ba0b4587af3cdc8de17'
let email = 'admin@sahara.com'
let user = {
	email,
	email_verified: true,
	username: 'Admin',
	groups: ['user', 'admin']
}

/**
 * Setup development database
 */
db = db.getSiblingDB('development')

db.createCollection('users')
db.createCollection('products')
db.createCollection('orders')
db.createCollection('hashes')
db.createCollection('tokens')
db.createCollection('checkout_sessions')
db.createCollection('discounts')
db.createCollection('noowner')
db.users.createIndex({ email: 1 }, { unique: true })
db.products.createIndex(
	{
	  name: "text",
	  short_desc: "text",
	  long_desc: "text"
	}
)

db.createRole({
	role: 'hashaccess',
	privileges: [
		{
			resource: { db: 'development', collection: 'products' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'hashes' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'orders' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'tokens' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'users' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'checkout_sessions' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'discounts' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'noowner' },
			actions: ['find', 'update', 'insert', 'remove']
		}
	],
	roles: []
})

db.createRole({
	role: 'restricted',
	privileges: [
		{
			resource: { db: 'development', collection: 'products' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'orders' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'tokens' },
			actions: ['find', 'remove']
		},
		{
			resource: { db: 'development', collection: 'users' },
			actions: ['find', 'update', 'remove']
		},
		{
			resource: { db: 'development', collection: 'checkout_sessions' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'discounts' },
			actions: ['find', 'update', 'insert', 'remove']
		},
		{
			resource: { db: 'development', collection: 'hashes' },
			actions: ['remove']
		},
		{
			resource: { db: 'development', collection: 'noowner' },
			actions: ['find', 'update', 'insert', 'remove']
		}
	],
	roles: []
})

db.createUser({
	'user': db_auth_user,
	'pwd': db_auth_pwd,
	'roles': [
		{
			'role': 'hashaccess',
			'db': 'development'
		}
	]
})

db.createUser({
	'user': db_user,
	'pwd': db_pwd,
	'roles': [
		{
			'role': 'restricted',
			'db': 'development'
		}
	]
})

let setup = async () => {
	db = db.getSiblingDB('production')
	let res = await db.users.insertOne(user)
	await db.users.updateOne({ _id: res.insertedId }, { $push: { owns: res.insertedId } })
	await db.hashes.insertOne({ user_id: res.insertedId, email, hash })

	db = db.getSiblingDB('development')
	res = await db.users.insertOne(user)
	await db.users.updateOne({ _id: res.insertedId }, { $push: { owns: res.insertedId } })
	await db.hashes.insertOne({ user_id: res.insertedId, email, hash })
}
setup()