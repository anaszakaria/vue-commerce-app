<template>
    <header id="main-header">
        <h1><router-link v-bind:to="{ path: '/'}">Online Shop</router-link></h1>
        <h3>{{ date }}</h3>
        <h3 v-if="userIsAuthenticated">Logged in as {{ getUserInfo().email }}</h3>
        <nav>
            <ul v-if="userIsAuthenticated">
                <li><router-link v-bind:to="{ path: '/products/1?pageItem=10'}" @click.native="reloadProductPage">Products</router-link></li>
                <li><router-link v-bind:to="{ path: '/cart'}">Shopping Cart</router-link></li>
                <li><router-link v-bind:to="{ path: '/profile'}">User Profile</router-link></li>
                <li><router-link v-bind:to="{ path: '/admin'}">Admin</router-link></li>
            </ul>
            <ul v-else>
                <li><router-link v-bind:to="{ path: '/products/1?pageItem=10'}" @click.native="reloadProductPage">Products</router-link></li>
                <li><router-link v-bind:to="{ path: '/cart'}">Shopping Cart</router-link></li>
                <li><router-link v-bind:to="{ path: '/signup'}">Sign Up</router-link></li>
                <li><router-link v-bind:to="{ path: '/signin'}">Sign In</router-link></li>
            </ul>
        </nav>
        <button id="logout" class="info" v-if="userIsAuthenticated" @click="signOut">Sign Out</button>
    </header>
</template>

<script>
import moment from 'moment'
import { bus } from '@/src/main.js'

export default {
    name: 'Header',
    data() {
        return {
            date: moment().format('LL')
        }
    },
    methods: {
        getUserInfo() {
            return this.$store.getters.user
        },
        signOut() {
            this.$store.dispatch('signOut')
        },
        reloadProductPage() {
            bus.$emit('gotoPage', 1)
            bus.$emit('resetPerPageResult')
        }
    },
    computed: {
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    }
}
</script>
