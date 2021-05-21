import { writable } from 'svelte/store'
import { signedin } from '../../../api/endpoints'

const waiting = writable(false)

const getSignedInUser = async (set) => {
    waiting.set(true)
    const res = await signedin()
    if (!res.body.error) {
        const { username, user_id, email, groups } = res.body
        set({ username, email, user_id, groups })
    }
    waiting.set(false)
}

const createUserStore = () => {
    const { subscribe, set } = writable(null, (set) => {
        getSignedInUser(set)
    })

    return {
        subscribe,
        signout: () => set(null),
        signin: () => getSignedInUser(set),
        inGroup: async group => {
            const promise = new Promise((resolve, reject) => {
                const unsub = waiting.subscribe(val => {
                    if (!val) {
                        let inGroup = false
                        subscribe(user => {
                            if (user && user.groups.indexOf(group) !== -1) inGroup = true
                        })()
                        setTimeout(() => unsub(), 50)
                        resolve(inGroup)
                    }
                })
            })
            return promise
        }
    }
}

export const user = createUserStore()
export const googleUser = writable()