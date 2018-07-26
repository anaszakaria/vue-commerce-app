export default {
    computed: {
        formIsValid() {
            return this.email !== '' && this.password !== ''
        }
    }
}
