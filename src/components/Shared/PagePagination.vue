<template>
    <section class="pagenumber">
        <ul>
            <li v-for="(index, item) in totalPage" v-bind:class="{ active:selected == index }" @click="gotoPage(index)">Page {{ index }}</li>
        </ul>
        <label>Items per page:</label>
        <select v-model="resultPerPage" @change="resetPage">
            <option disabled value="">Result Per Page</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>100</option>
        </select>
    </section>
</template>

<script>
export default {
    name: 'PagePagination',
    props: ['totalPage', 'selected'],
    data () {
        return {
            resultPerPage: 10
        }
    },
    methods: {
        resetPage() {
            console.log('emit')
            this.$emit('resetPage', this.resultPerPage)
        },
        gotoPage(index) {
            this.$emit('gotoPage', index)
        }
    },
    created() {
        console.log(this.$route.query.pageItem)
    }
}
</script>
