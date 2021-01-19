console.log('%c middleware: middleware/check-auth.js ', 'background: gray; color: white');
import store from '@/store'

export default async (to, from, next) => {
    if (!store.getters['auth/check'] && store.getters['auth/token']) {
        try {
            await store.dispatch('auth/fetchUser')
        } catch (e) {
            console.error(e)
        }
    }

    next()
}
