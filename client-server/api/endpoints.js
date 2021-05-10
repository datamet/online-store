/**
 * API endpoints
 *
 * A convenient collection of all the requests you can make to the
 * backend api. Uses the client core to send requests
 */

import { setup as setupServer, browserFetch } from './fetch.js'
import * as path from 'path'

export const routes = {
	// Login
	login: (email, password) => {
		const credentials = `${email}:${password}`
		const encode = btoa(credentials)
		const autHeader = `Basic ${encode}`
		return browserFetch({
			method: 'POST',
			path: '/auth/local',
			header: {
				'Authorization': autHeader
			}
		})
	},

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
	updateProduct: ({ name, price, keywords, short_desc, long_desc, product_id }) => browserFetch({
		method: 'POST',
		path: `/api/v1/product/:${product_id}`,
		body: { name, price, keywords, short_desc, long_desc }
	}),
	deleteProduct: ({product_id}) => browserFetch({method: 'DELETE', path: `/api/v1/product/:${product_id}`})

	// Users


	// Checkout

	// Discounts
}

export const setup = setupServer
