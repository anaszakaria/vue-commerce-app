import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import shared components
import Modal from './components/Shared/Modal.vue'

Vue.config.productionTip = false

// register middleware
Vue.use(VueAxios, axios)

// register global component
Vue.component('app-modal', Modal)

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
