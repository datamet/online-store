import { writable } from 'svelte/store'
import { getProducts, getProductKeywords, get } from '../../../api/endpoints.js'

const createFetchStore = (fetchFunc) => {
    const { subscribe, set } = writable([])

    return {
        subscribe,
        fetch: async (params) => { 
            const res = typeof params === 'string' ? await get(params) : await fetchFunc(params)
            return { set, res }
        }
    }
}

export const productStore = createFetchStore(getProducts)
export const keywordStore = createFetchStore(getProductKeywords)