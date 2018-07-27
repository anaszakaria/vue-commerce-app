<template>
    <section class="pagenumber">
        <ul>
            <li v-for="(index, item) in totalPage" v-bind:class="{ active:selected == index }" @click="gotoPage(index)">Page {{ index }}</li>
        </ul>
        <label>Items per page:</label>
        <select v-model="showItem" @change="resetPage">
            <option disabled value="">Result Per Page</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>100</option>
        </select>
    </section>
</template>

<script>
import { bus } from '@/src/main.js'

export default {
    name: 'PagePagination',
    props: ['totalPage', 'resultPerPage'],
    data () {
        return {
            showItem: this.resultPerPage,
            selected: 1,
            routepath: this.$route.path.replace(/[^a-z/]+/g, "")
        }
    },
    methods: {
        gotoPage(page) {
            this.$router.push({ path: this.routepath + page, query: { pageItem: this.showItem } })
            this.selected = page
            this.startArrayPos = (page - 1) * parseInt(this.showItem)
        },
        resetPage() {
            this.$router.push({ path: this.routepath + '1', query: { pageItem: this.showItem } })
            this.selected = 1
            this.startArrayPos = 0
        }
    },
    created() {
        this.gotoPage(this.$route.params.pg)
        bus.$on('gotoPage', (page) => {
            this.gotoPage(page)
        })
        bus.$on('resetPerPageResult', () => {
            this.showItem = 10
            this.$router.push({ query: { pageItem: this.showItem } })
        })
    }
}
</script>
