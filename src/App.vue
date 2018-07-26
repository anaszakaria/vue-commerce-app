<template>
    <div id="app">
        <app-header></app-header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Header from '@/src/components/Layout/Header.vue'
import moment from 'moment'

export default {
    name: 'App',
    components: {
        'app-header': Header
    }
}
</script>

<style lang="scss">
@import "~scss/main";
</style>
