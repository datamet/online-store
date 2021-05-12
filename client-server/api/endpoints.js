/**
 * API endpoints
 *
 * A convenient collection of all the requests you can make to the
 * backend api. Uses the client core to send requests
 */

import { setup as setupServer, browserFetch } from './fetch.js'

const encodeCredentials = (email, password) => {
	const credentials = `${email}:${password}`
	const encode = btoa(credentials)
	return `Basic ${encode}`
}

export const routes = {
	// Login
	createUser: ({ email, password, username, groups }) => browserFetch({
		method: 'POST',
		path: '/auth/users',
		headers: { 'Authorization': encodeCredentials(email, password) },
		body: { username, groups }
	}),
	login: (email, password) => {
		const autHeader = encodeCredentials(email, password)
		return browserFetch({
			method: 'POST',
			path: '/auth/local',
			headers: {
				'Authorization': autHeader
			}
		})
	},
	logout: () => browserFetch({ method: 'DELETE', path: '/auth/local' }),
	createGoogleUser: ({ id_token, email, password }) => browserFetch({
		method: 'POST',
		path: '/auth/google',
		headers: { 'Authorization': encodeCredentials(email, password) },
		query: { id_token }
	}),


	// Users
	getUser: ({ user_id }) => browserFetch({ method: 'GET', path: `/api/v1/user/:${user_id}` }),
	getUsers: () => browserFetch({ method: 'GET', path: '/api/v1/users' }),
	updateUser: ({ user_id, username, groups, email }) => browserFetch({
		method: 'PUT',
		path: `/api/v1/user/:${user_id}`,
		body: { username, groups, email }
	}),
	deleteUser: ({ user_id }) => browserFetch({ method: 'DELETE', path: `/api/v1/user/:${user_id}` }),

	// Orders
	createOrder: body => browserFetch({ method: 'POST', path: '/api/v1/orders', body }),
	getOrder: ({ order_id }) => browserFetch({ method: 'GET', path: `/api/v1/order/:${order_id}` }),
	getOrders: ({ user_id }) => browserFetch({ method: 'GET', path: '/api/v1/orders', query: { user_id } }),
	deleteOrder: ({ order_id }) => browserFetch({ method: 'DELETE', path: `/api/v1/order/:${order_id}` }),

	// Products
	createProduct: body => browserFetch({ method: 'POST', path: '/api/v1/products' }, body),
	getProduct: ({ product_id }) => browserFetch({ method: 'GET', path: `/api/v1/product/:${product_id}` }),
	getProducts: ({ index, count, keyword, search }) => browserFetch({
		method: 'GET',
		path: '/api/v1/products',
		query: { index, count, keyword, search }
	}),
	updateProduct: ({ product_id, name, price, keywords, short_desc, long_desc }) => browserFetch({
		method: 'POST',
		path: `/api/v1/product/:${product_id}`,
		body: { name, price, keywords, short_desc, long_desc }
	}),
	deleteProduct: ({ product_id }) => browserFetch({ method: 'DELETE', path: `/api/v1/product/:${product_id}` }),

	// Checkout
	createCheckout: body => browserFetch({ method: 'POST', path: '/api/v1/checkout', body }),

	// Discounts
	createDiscount: body => browserFetch({ method: 'POST', path: '/api/v1/discounts', body }),
	getDiscount: ({ discount_code }) => browserFetch({ method: 'GET', path: `/api/v1/discount/:${discount_code}` }),
	getDiscounts: () => browserFetch({ method: 'GET', path: '/api/v1/discounts' })
}

export const setup = setupServer