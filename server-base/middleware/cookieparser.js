const cookieparser = (req, res, next) => {
	const rawCookies = req.headers.cookie.split('; ')

	const parsedCookies = {}
	rawCookies.forEach(rawCookie => {
		const parsedCookie = rawCookie.split('=')
		parsedCookies[parsedCookie[0]] = parsedCookie[1]
	})
	req.getCookie = (name) => parsedCookies[name]
	req.getCookies = () => parsedCookies
	next()
}

module.exports = cookieparser
