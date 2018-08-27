import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import router from '@/src/router'

Vue.use(VueAxios, axios)

export default {
    state: {
        user: null,
        auth: {
            token: null
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setToken(state, payload) {
            state.auth.token = payload
        }
    },
    actions: {
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
        user(state) {
            return state.user
        },
        token(state) {
            return state.auth.token
        }
    }
}
