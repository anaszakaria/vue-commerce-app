import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import router from '@/src/router'

Vue.use(VueAxios, axios)

export default {
    state: {
        loadedLists: []
    },
    mutations: {
        setLoadedLists(state, payload) {
            state.loadedLists = payload
        },
        addList(state, payload) {
            state.loadedLists.push(payload)
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
        }
    }
}
