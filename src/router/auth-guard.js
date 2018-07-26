import { store } from '../store'

export default (to, from, next) => {
    store.dispatch('checkSession')
    if (store.getters.user) {
        next()
    } else {
        next('/signin')
    }
}
