import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import router from '@/src/router'

Vue.use(VueAxios, axios)

export default {
    state: {
        cart: []
    },
    mutations: {
        setLoadedCart(state, payload) {
            state.cart = payload
        },
        addToCart(state, payload) {
            state.cart.push(payload)
        }
    },
    actions: {
        loadCart({commit}) {
            const cart = JSON.parse(localStorage.getItem('shoppingcart'))
            if (cart) {
                commit('setLoadedCart', cart)
            } else {
                console.log('localStorage shoppingcart is empty')
            }
        },
        addToCart({commit, state}, payload) {
            const cart = {
                _id: payload._id,
                productId: payload.productId,
                productName: payload.productName,
                price: payload.price,
                imageURL: payload.imageURL,
                amountOrdered: payload.amountOrdered
            }
            const findDuplicateItem = state.cart.find(obj => obj._id === payload._id)
            if (findDuplicateItem) {
                alert('Item is already in cart')
            } else {
                alert('Item added to cart')
                commit('addToCart', cart)
                localStorage.setItem('shoppingcart', JSON.stringify(state.cart))
            }
        }
    },
    getters: {
        cart(state) {
            return state.cart
        }
    }
}
