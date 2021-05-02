const cookieparser = (req, res, next) => {
	let rawCookies = []
	if (req.headers.cookie) rawCookies = req.headers.cookie.split('; ')

	const parsedCookies = {}
	for (const rawCookie of rawCookies) {
		const parsedCookie = rawCookie.split('=')
		parsedCookies[parsedCookie[0]] = parsedCookie[1]
	}
	req.getCookie = (name) => parsedCookies[name]
	req.getCookies = () => parsedCookies
	next()
}

module.exports = cookieparser
