/**
 * API endpoints
 *
 * A convenient collection of all the requests you can make to the
 * backend api. Uses the client core to send requests
 */

const routes = core => { return {
	// Login
	login: (username, password) => core.post('/auth/users', { body: { username, password }})

	// Orders

	// Products

	// Users

	// Checkout

	// Discounts


}}

export default (interactor) => {
	return routes(interactor)
}