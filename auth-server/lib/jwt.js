const https = require('https')
const hash = require('./hash')
const { db, error } = require('server-framework')
const { public_host } = require('../config')

const authenticate = async (user_id, req, res) => {
    res.clearCookie('auth_token')
	const auth_token = hash.randomStr(30)
	const expires = Date.now() + (1000 * 60 * 60 * 24)
	await db.storeAuthToken({ user_id, auth_token, expires })
    await setAuthCookie(auth_token, req, res)
}

const unauthenticate = async ({ user_id, auth_token }, req, res) => {
    await db.removeAuthToken({ user_id, auth_token })
	await clearAuthCookies(req, res)
}

const verifyLocalToken = async auth_token => {
    const token_info = await db.getAuthToken({ auth_token })
	if (token_info) {
		if (token_info.expires < Date.now()) throw error.expired()
		return token_info
	}
	throw error.unauthorized()
}

const verifyGoogleToken = id_token => {
	return new Promise((resolve, reject) => {
		const options = {
			hostname: 'www.googleapis.com',
			path: `/oauth2/v3/tokeninfo?id_token=${id_token}`,
			method: 'get',
		}

		const request = https.request(options, respons => {
			let data = ''
			respons.on('data', d => {
				data += d
			})

			respons.on('end', () => {
				try {
					const res = JSON.parse(data)
					resolve(res)
				} catch (error) {
					reject(error)
				}
			})
		})

		request.on('error', error => {
			reject(error)
		})

		request.end()
	})
}

const bearer = auth_header => {
	const [ scheme, token ] = auth_header.split(' ')
	if (scheme === 'Bearer') {
		return token
	}
	throw error.authentication()
}

const basic = basic_header => {
	if (!basic || typeof basic_header !== 'string') return []
    const [ scheme, credentials ] = basic_header.split(' ')
	if (scheme === 'Basic') {
        return Buffer.from(credentials, 'base64').toString('ascii').split(':')
	}
	return []
}

const clearAuthCookies = async (req, res) => {
	res.clearCookie('auth_token', {domain: public_host, path:'/'})
}

const setAuthCookie = async (auth_token, req, res) => {
	const time = 86_400_000
	await clearAuthCookies(req, res)
	res.cookie('auth_token', auth_token, {
		maxAge: time,
		httpOnly: true,
		secure: true,
		path: '/',
		sameSite: 'none'
	})
}

module.exports = {
	clearAuthCookies,
	verifyGoogleToken,
    verifyLocalToken,
	authenticate,
    unauthenticate,
	bearer,
	basic
}
