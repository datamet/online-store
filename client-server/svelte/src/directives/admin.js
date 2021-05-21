import { navigate } from 'svelte-routing'
import { user } from '../stores/user'

export const admin = () => {
    const checkAdmin = async () => {
        if (!(await user.inGroup('admin'))) {
            setTimeout(() => {
                navigate('/', { replace: true })
            }, 10)
        }
    }
    checkAdmin()
}