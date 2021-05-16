import { writable } from 'svelte/store'

const createCartStore = ()  => {
    const { subscribe, set, update } = writable([], set => {
        const stringCart = localStorage.getItem('cart')
        if (cart) {
            const cart = JSON.parse(stringCart)
            set(cart)
        }
    })

    return {
        subscribe,
        silent: (product_id, amount) => {
            subscribe(cart => {
                let remove = false
                for (const item of cart) {
                    if (item.product_id === product_id) {
                        if (amount < 1) remove = true
                        else {
                            item.amount = amount
                        }
                    }
                }
                if (remove) cart.filter(item => item.product_id !== product_id)
                localStorage.setItem('cart', JSON.stringify(cart))
            })()
        },
        set: (product_id, amount) => {
            if (!amount) return false
            update(cart => {
                if (!cart) cart = []
                let updated = false
                let remove = false
                for(const item of cart) {
                    if (item.product_id === product_id) {
                        if (amount < 1) remove = true
                        else { 
                            item.amount = amount
                            updated = true
                        }
                        break
                    }
                }
                if (remove) cart.filter(item => item.product_id !== product_id)
                if (!updated) cart.push({ product_id, amount })
                localStorage.setItem('cart', JSON.stringify(cart))
                return cart
            })
        },
        add: (product_id, amount) => {
            if (!amount) return false
            update(cart => {
                if (!cart) cart = []
                let updated = false
                for(const item of cart) {
                    if (item.product_id === product_id) {
                        item.amount += amount
                        updated = true
                        break
                    }
                }
                if (!updated) cart.push({ product_id, amount })
                localStorage.setItem('cart', JSON.stringify(cart))
                return cart
            })
        },
        remove: (product_id, amount) => {
            update(cart => {
                if (!cart) cart = []
                let i
                for (const [index, item] of cart.entries()) {
                    if (item.product_id === product_id) {
                        if (amount) item.amount = item.amount -= amount
                        else i = index
                        if (item.amount <= 0) i = index
                    }
                }
                if (i !== undefined) cart = cart.filter(item => item.product_id !== product_id)
                localStorage.setItem('cart', JSON.stringify(cart))
                return cart
            })
        },
        reset: () => {
            localStorage.removeItem('cart')
            set([])
        }
    }
}

const createTotalStore = () => {
    const { subscribe, update } = writable([])

    return {
        subscribe,
        set: (product_id, price, currency) => {
            update(arr => {
                let exists = false
                for (const item of arr) {
                    if (item.product_id === product_id) {
                        exists = true
                        item.price = price
                        break
                    }
                }
                if (!exists) arr.push({ product_id, price, currency })
                return arr
            })
        },
        remove: (product_id) => {
            update(arr => {
                return arr.filter((item) => item.product_id !== product_id)
            })
        }
    }
}

export const cart = createCartStore()
export const total = createTotalStore()