import { writable } from 'svelte/store'

const createAddressStore = () => {
    const { subscribe, set, update } = writable({
        country: '',
		province: '',
		city: '',
		zip: '',
		street: ''
    }, set => {
        const stringAddress = localStorage.getItem('address')
        if (stringAddress) {
            const address = JSON.parse(stringAddress)
            set(address)
        }
    })

    return {
        subscribe,
        set: address => {
            if (!address) return
            localStorage.setItem('address', JSON.stringify(address))
            set(address)
        }
    }
}

const createCuponStore = () => {
    const { subscribe, set, update } = writable({
        code: '',
		percent: ''
    }, set => {
        const stringCupon = localStorage.getItem('address')
        if (stringCupon) {
            const address = JSON.parse(stringCupon)
            set(address)
        }
    })

    return {
        subscribe,
        set: cupon => {
            if (!cupon) return
            localStorage.setItem('cupon', JSON.stringify(cupon))
            set(cupon)
        }
    }
}

export const addressStore = createAddressStore()
export const cuponStore = createAddressStore()