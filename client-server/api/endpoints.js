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

export const signup = ({ email, password, username, groups }) => browserFetch({
	method: 'POST',
	path: '/auth/users',
	headers: { 'Authorization': encodeCredentials(email, password) },
	body: { username, groups },
})
export const signin = ({ email, password }) => {
	const autHeader = encodeCredentials(email, password)
	return browserFetch({
		method: 'POST',
		path: '/auth/local',
		headers: {
			'Authorization': autHeader,
		},
	})
}
export const signout = () => browserFetch({ method: 'DELETE', path: '/auth/local' })
export const googleSignup = ({ id_token, email, password }) => browserFetch({
	method: 'POST',
	path: '/auth/google',
	headers: { 'Authorization': encodeCredentials(email, password) },
	query: { id_token },
})

// Users
export const getUser = ({ user_id }) => browserFetch({ method: 'GET', path: `/api/v1/user/${user_id}` })
export const getUsers = () => browserFetch({ method: 'GET', path: '/api/v1/users' })
export const updateUser = ({ user_id, username, groups, email }) => browserFetch({
	method: 'PUT',
	path: `/api/v1/user/:${user_id}`,
	body: { username, groups, email },
})
export const deleteUser = ({ user_id }) => browserFetch({ method: 'DELETE', path: `/api/v1/user/${user_id}` })

// Orders
export const createOrder = body => browserFetch({ method: 'POST', path: '/api/v1/orders', body })
export const getOrder = ({ order_id }) => browserFetch({ method: 'GET', path: `/api/v1/order/${order_id}` })
export const getOrderStatistics = () => browserFetch({ method: 'GET', path: `/api/v1/orders/statistics` })
export const getOrders = ({ user_id }) => browserFetch({ method: 'GET', path: '/api/v1/orders', query: { user_id } })
export const deleteOrder = ({ order_id }) => browserFetch({ method: 'DELETE', path: `/api/v1/order/${order_id}` })

// Products
export const createProduct = body => browserFetch({ method: 'POST', path: '/api/v1/products', body })
export const getProduct = ({ product_id }) => browserFetch({ method: 'GET', path: `/api/v1/product/${product_id}` })
export const getProducts = ({ index, count, keyword, search }) => browserFetch({
	method: 'GET',
	path: '/api/v1/products',
	query: { index, count, keyword, search },
})
export const getProductKeywords = () => browserFetch({ method:'GET', path: '/api/v1/products/keywords' })

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
export const deleteProduct = ({ product_id }) => browserFetch({ method: 'DELETE', path: `/api/v1/product/${product_id}` })

// Checkout
export const createCheckoutSession = body => browserFetch({ method: 'POST', path: '/api/v1/checkout', body })
export const getCheckoutSession = ({ checkout_id }) => browserFetch({ method: 'GET', path: `/api/v1/checkout/${checkout_id}` })

// Discounts
export const createDiscount = body => browserFetch({ method: 'POST', path: '/api/v1/discounts', body })
export const validateDiscount = ({ discount_code }) => browserFetch({ method: 'GET', path: `/api/v1/discount/${discount_code}` })
export const getDiscounts = () => browserFetch({ method: 'GET', path: '/api/v1/discounts' })
export const removeDiscount = ({ discount_code }) => browserFetch({ method: 'DELETE', path: `/api/v1/discount/${discount_code}` })

export const setup = setupServer

export const validEmail = ({ email }) => browserFetch({
	method: 'POST',
	path: '/api/v1/validate/email',
	body: { email }
})
export const validPassword = ({ password }) => browserFetch({
	method: 'POST',
	path: '/api/v1/validate/password',
	body: { password }
})
export const validUsername = ({ username }) => browserFetch({
	method: 'POST',
	path: '/api/v1/validate/username',
	body: { username }
})

export const validateCountry = ({ country }) => browserFetch({ method: 'POST', path: '/api/v1/validate/country', body: { country }})
export const validateProvince = ({ province }) => browserFetch({ method: 'POST', path: '/api/v1/validate/province', body: { province }})
export const validateCity = ({ city }) => browserFetch({ method: 'POST', path: '/api/v1/validate/city', body: { city }})
export const validateZip = ({ zip }) => browserFetch({ method: 'POST', path: '/api/v1/validate/zip', body: { zip }})
export const validateStreet = ({ street }) => browserFetch({ method: 'POST', path: '/api/v1/validate/street', body: { street }})

export const validCupon = ({ discount_code }) => browserFetch({ method: 'POST', path: '/api/v1/validate/discount_code', body: { discount_code } })
export const validPercent = ({ percent }) => browserFetch({ method: 'POST', path: '/api/v1/validate/percent', body: { percent } })

export const validProductName = ({ name }) => browserFetch({ method: 'POST', path: '/api/v1/validate/name', body: { name } })
export const validPrice = ({ price }) => browserFetch({ method: 'POST', path: '/api/v1/validate/price', body: { price } })
export const validStock = ({ stock }) => browserFetch({ method: 'POST', path: '/api/v1/validate/count', body: { count: stock } })
export const validKeywords = ({ keywords }) => browserFetch({ method: 'POST', path: '/api/v1/validate/keywords', body: { keywords } })
export const validKeyword = ({ keyword }) => browserFetch({ method: 'POST', path: '/api/v1/validate/keyword', body: { keyword } })
export const validShortDesc = ({ short_desc }) => browserFetch({ method: 'POST', path: '/api/v1/validate/short_desc', body: { short_desc } })
export const validLongDesc = ({ long_desc }) => browserFetch({ method: 'POST', path: '/api/v1/validate/long_desc', body: { long_desc } })

export const signedin = () => browserFetch({ method: 'GET', path: '/auth/user' })

export const get = (url) => browserFetch({ method: 'GET', path: url })