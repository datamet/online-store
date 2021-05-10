import { setup, routes } from './endpoints.js'


setup('http', 'localhost', 80)

/*
const res = await routes.createUser({
	email: "eriksommer@gmail.com",
	password: "#Erik1999",
	username: "erikssommer"
})
*/

const res = await routes.login("eriksommer@gmail.com", "#Erik1999")

console.log(res)

const res2 = await routes.logout()

console.log(res2)
