<template>
    <div id="home">
        <header>
            <h1>{{ memberList }}</h1>
            <router-link v-if="userIsAuthenticated" v-bind:to="{ path: '/addlist'}"><button>Add List</button></router-link>
        </header>
        <div class="listBox" v-for="list in sortedList" :key="sortedList._id">
            <p>ID: {{ list._id }}</p>
            <p>Name: {{ list.name | toUppercase }}</p>
            <p>Age: {{ list.age }}</p>
            <p>Profession: {{ list.job }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Home',
    data () {
        return {
            memberList: 'Member List'
        }
    },
    computed: {
        ...mapGetters(['sortedList']),
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    }
}
</script>
