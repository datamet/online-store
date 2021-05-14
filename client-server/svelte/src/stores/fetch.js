import { writable } from 'svelte/store'
import { getProducts } from '../../../api/endpoints.js'

const createFetchStore = (fetchFunc) => {
    const { subscribe, set } = writable([])

    return {
        subscribe,
        fetch: async (params) => {
            const res = await fetchFunc(params)
            return { set, res }
        }
    }
}

export const productStore = createFetchStore(getProducts)