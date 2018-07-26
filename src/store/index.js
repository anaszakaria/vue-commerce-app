import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
    state: {
        loadedLists: [],
        cart: [],
        user: null,
        loading: false,
        error: null,
        auth: {
            token: null
        },
        ip: '192.168.2.232'
    },
    mutations: {
        setLoadedLists(state, payload) {
            state.loadedLists = payload
        },
        addList(state, payload) {
            state.loadedLists.push(payload)
        },
        setLoadedCart(state, payload) {
            state.cart = payload
        },
        addToCart(state, payload) {
            state.cart.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        },
        setToken(state, payload) {
            state.auth.token = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        loadPerson({commit, getters}) {
            Vue.axios.get(`http://${getters.ip}:3000/person`, {
                headers: {
                    'Authorization': 'Bearer ' + getters.token
                }
            })
            .then((response) => {
                commit('setLoadedLists', response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        },
        addList({commit, getters}, payload) {
            const list = {
                name: payload.name,
                age: payload.age,
                job: payload.job
            }
            commit('addList', {
                ...list,
                _id: Math.floor(Math.random() * 100)
            })
            // vue-axios to store data
        },
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
        },
        signUserUp({commit, getters}, payload) {
            commit('setLoading', true)
            commit('clearError')
            Vue.axios.post(`http://${getters.ip}:3000/user/signup`, payload)
            .then((response) => {
                commit('setLoading', false)
                console.log(response.data)
                router.push('/signin')
            })
            .catch(error => {
                commit('setLoading', false)
                commit ('setError', error)
                console.log(error.response.data)
            })
        },
        signUserIn({commit, getters}, payload) {
            Vue.axios.post(`http://${getters.ip}:3000/user/login`, payload)
            .then((response) => {
                console.log(response.data)
                const newUser = {
                    email: response.data.email,
                    token: response.data.token
                }
                commit('setUser', newUser)
                commit('setToken', response.data.token)
                sessionStorage.setItem('user', JSON.stringify(newUser))
                router.push('/')
            })
            .catch(error => {
                console.log(error.response.data)
            })
        },
        signOut({commit}) {
            delete sessionStorage.user
            commit('setUser', null)
            router.push('/')
        },
        checkSession({commit, getters}) {
            const user = JSON.parse(sessionStorage.getItem('user'))
            console.log(user)
            if (user) {
                commit('setUser', user)
                commit('setToken', user.token)
            }
        }
    },
    getters: {
        sortedList(state) {
            return state.loadedLists.sort((listA, listB) => {
                return listA.id > listB.id
            })
        },
        featuredLists(state) {
            return state.loadedLists.slice(0, 4)
        },
        cart(state) {
            return state.cart
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.auth.token
        },
        ip(state) {
            return state.ip
        }
    }
})
