import { writable } from 'svelte/store'
import { signedin } from '../../../api/endpoints'

const getSignedInUser = async (set) => {
    const res = await signedin()
    if (!res.body.error) {
        const { username, user_id, email } = res.body
        set({ username, email, user_id })
    }
}

const createUserStore = () => {
    const { subscribe, set } = writable(0, (set) => {
        getSignedInUser(set)
    })

    return {
        subscribe,
        signout: () => set(null),
        signin: () => getSignedInUser(set)
    }
}

export const user = createUserStore()