import Vue from 'vue'
import Vuex from 'vuex'

import home from '@/src/store/cart'
import cart from '@/src/store/home'
import user from '@/src/store/user'
import shared from '@/src/store/shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        cart: cart,
        home: home,
        user: user,
        shared: shared
    }
})
