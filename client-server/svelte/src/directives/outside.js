export const outside = element => {
	const handleClick = event => {
		if (
			element &&
			!element.contains(event.target) &&
			!event.defaultPrevented
		) {
			element.dispatchEvent(new CustomEvent('outside', element))
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}
