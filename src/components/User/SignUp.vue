<template>
    <div id="signup-page">
        <h1>Sign Up</h1>
        <form v-on:submit.prevent="signUserUp">
            <label for="email">Email:</label>
            <input v-focus type="email" id="email" v-model="email" name="email" placeholder="a@b.com">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" name="password" placeholder="*****">
            <input type="submit" value="Submit" v-bind:class="{ active:formIsValid }" v-bind:disabled="!formIsValid">
        </form>
        <app-modal>
            <header slot="modalheader">
                <h4>Slot Header for Sign Up</h4>
            </header>
        </app-modal>
    </div>
</template>

<script>
import formIsValid from '@/src/mixins/formIsValid'

export default {
    name: 'SignUp',
    mixins: [formIsValid],
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signUserUp() {
            this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
        }
    }
}
</script>
