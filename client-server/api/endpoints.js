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

export const signup = ({ email, password, username, groups }) =>
	browserFetch({
		method: 'POST',
		path: '/auth/users',
		headers: { 'Authorization': encodeCredentials(email, password) },
		body: { username, groups }
	})
export const signin = ({ email, password }) => {
	const autHeader = encodeCredentials(email, password)
	return browserFetch({
		method: 'POST',
		path: '/auth/local',
		headers: {
			'Authorization': autHeader,
		}
	})
}
export const signout = () =>
	browserFetch({ method: 'DELETE', path: '/auth/local' })
export const googleSignup = ({ id_token, email, password }) =>
	browserFetch({
		method: 'POST',
		path: '/auth/google',
		headers: { 'Authorization': encodeCredentials(email, password) },
		query: { id_token },
	})

// Users
export const getUser = ({ user_id }) =>
	browserFetch({ method: 'GET', path: `/api/v1/user/:${user_id}` })
export const getUsers = () =>
	browserFetch({ method: 'GET', path: '/api/v1/users' })
export const updateUser = ({ user_id, username, groups, email }) =>
	browserFetch({
		method: 'PUT',
		path: `/api/v1/user/:${user_id}`,
		body: { username, groups, email },
	})
export const deleteUser = ({ user_id }) =>
	browserFetch({ method: 'DELETE', path: `/api/v1/user/:${user_id}` })

// Orders
export const createOrder = body =>
	browserFetch({ method: 'POST', path: '/api/v1/orders', body })
export const getOrder = ({ order_id }) =>
	browserFetch({ method: 'GET', path: `/api/v1/order/:${order_id}` })
export const getOrders = ({ user_id }) =>
	browserFetch({ method: 'GET', path: '/api/v1/orders', query: { user_id } })
export const deleteOrder = ({ order_id }) =>
	browserFetch({ method: 'DELETE', path: `/api/v1/order/:${order_id}` })

// Products
export const createProduct = body =>
	browserFetch({ method: 'POST', path: '/api/v1/products' }, body)
export const getProduct = ({ product_id }) =>
	browserFetch({ method: 'GET', path: `/api/v1/product/:${product_id}` })
export const getProducts = ({ index, count, keyword, search }) =>
	browserFetch({
		method: 'GET',
		path: '/api/v1/products',
		query: { index, count, keyword, search },
	})
export const updateProduct = ({
	product_id,
	name,
	price,
	keywords,
	short_desc,
	long_desc,
}) =>
	browserFetch({
		method: 'POST',
		path: `/api/v1/product/:${product_id}`,
		body: { name, price, keywords, short_desc, long_desc },
	})
export const deleteProduct = ({ product_id }) =>
	browserFetch({ method: 'DELETE', path: `/api/v1/product/:${product_id}` })

// Checkout
export const createCheckout = body =>
	browserFetch({ method: 'POST', path: '/api/v1/checkout', body })

// Discounts
export const createDiscount = body =>
	browserFetch({ method: 'POST', path: '/api/v1/discounts', body })
export const getDiscount = ({ discount_code }) =>
	browserFetch({ method: 'GET', path: `/api/v1/discount/:${discount_code}` })
export const getDiscounts = () =>
	browserFetch({ method: 'GET', path: '/api/v1/discounts' })

export const setup = setupServer
