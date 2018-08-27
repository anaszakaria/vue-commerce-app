import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

// create event bus
export const bus = new Vue()

// import shared components
import Modal from './components/Shared/Modal.vue'

// register global component
Vue.component('app-modal', Modal)

// register middleware
Vue.use(VueAxios, axios)

// global filters
import Snippet from './filters/snippet'
import ConvertDecimal from './filters/convertDecimal'

Vue.filter('snippet', Snippet)
Vue.filter('convertToDecimal', ConvertDecimal)
Vue.filter('toUppercase', value => {
    return value.toUpperCase()
})

// global custom directives
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
        this.$store.dispatch('loadPerson')
        this.$store.dispatch('loadCart')
        this.$store.dispatch('checkSession')
    }
})
