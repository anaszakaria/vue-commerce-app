<template>
    <div id="signin-page">
        <h1>Sign In</h1>
        <form v-on:submit.prevent="signUserIn">
            <label for="email">Email:</label>
            <input v-focus type="email" id="email" v-model="email" name="email" placeholder="a@b.com">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" name="password" placeholder="*****">
            <input type="submit" value="Submit" v-bind:class="{ active:formIsValid }" v-bind:disabled="!formIsValid">
        </form>
        <app-modal>
            <footer slot="modalfooter">
                <h4>Footer for Sign In</h4>
            </footer>
        </app-modal>
    </div>
</template>

<script>
import formIsValid from '@/src/mixins/formIsValid'

export default {
    name: 'SignIn',
    mixins: [formIsValid],
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signUserIn() {
            this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        }
    }
}
</script>
