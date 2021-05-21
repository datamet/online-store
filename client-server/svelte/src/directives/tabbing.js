export const tabbing = () => {
    const handleFirstClick = (e) => {
        document.body.classList.remove('user-is-tabbing')
        window.removeEventListener('mousedown', handleFirstClick)
        window.addEventListener('keydown', handleFirstTab)
    }
    
    const handleFirstTab = (e) => {
        if (e.keyCode === 9) {
            document.body.classList.add('user-is-tabbing')
            window.removeEventListener('keydown', handleFirstTab)
            window.addEventListener('mousedown', handleFirstClick)
        }
    }
    
    window.addEventListener('keydown', handleFirstTab)
    
    return {
		destroy() {
			window.removeEventListener('keydown', handleFirstTab)
			window.removeEventListener('mousedown', handleFirstClick)
		}
	};
}