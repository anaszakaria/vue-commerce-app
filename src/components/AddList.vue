<template>
    <div id="add-list">
        <h1>Add List</h1>
        <form v-on:submit.prevent="onCreateList">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" name="name" placeholder="Your name..">
            <label for="age">Age:</label>
            <input type="text" id="age" v-model.number="age" name="age" placeholder="Your age..">
            <label for="job">Profession:</label>
            <select id="job" v-model="job" name="job">
                <option value="Doctor">Doctor</option>
                <option value="Engineer">Engineer</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Programmer">Programmer</option>
                <option value="Others">Others</option>
            </select>
            <input type="submit" value="Submit" v-bind:class="{ active:formIsValid }" v-bind:disabled="!formIsValid">
        </form>
        <app-modal></app-modal>
    </div>
</template>

<script>
export default {
    name: 'AddList',
    data () {
        return {
            name: '',
            age: '',
            job: ''
        }
    },
    methods: {
        onCreateList() {
            if (!this.formIsValid) {
                return
            }
            const listData = {
                name: this.name,
                age: this.age,
                job: this.job
            }
            this.$store.dispatch('addList', listData)
            this.$router.push('/')
        }
    },
    computed: {
        formIsValid() {
            return this.name !== '' && this.age !== '' && this.job !== ''
        }
    }
}
</script>

<style scoped lang="scss">
#add-list {
    padding: 12px;
}

input[type=text], select {
    width: 200px;
    padding: 8px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #CCC;
    box-sizing: border-box;
}

input[type=submit] {
    opacity: 0.5;
    background-color: #000;
    color: white;
    padding:10px 20px;
    margin: 8px;
    border: none;
    cursor: auto;
}

input[type=submit].active {
    opacity: 1;
    cursor: pointer;
    background-color: #4CAF50;
}

label {
    margin: 0 4px 0 12px;
}
</style>
