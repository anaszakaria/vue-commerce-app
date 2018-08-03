<template>
    <div id="app">
        <app-header v-if="mainHeader"></app-header>
        <main>
            <transition name="slide">
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>

<script>
import Header from '@/src/components/Layout/Header.vue'
import moment from 'moment'

export default {
    name: 'App',
    data() {
        return {
            mainHeader: true
        }
    },
    components: {
        'app-header': Header
    }
}
</script>

<style lang="scss">
@import "~scss/main";

.slide-enter-active {
    transition: all .3s;
}

.slide-enter {
    margin-top: 50px;
    opacity: 0;
}

.slide-leave-active {
    display: none;
}

.slide-leave-to {
    display: none;
}
</style>
