import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import router from '@/src/router'

Vue.use(VueAxios, axios)

export default {
    state: {
        loading: false,
        error: null,
        ip: 'localhost'
    },
    mutations: {
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

    },
    getters: {
        ip(state) {
            return state.ip
        }
    }
}
