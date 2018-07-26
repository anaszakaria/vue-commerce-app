<template>
    <div id="products">
        <h1>Products</h1>
        <section class="pagenumber">
            <ul>
                <li v-for="(index, item) in totalPage" v-bind:class="{ active:selected == index }" @click="gotoPage(index)">Page {{ index }}</li>
            </ul>
            <label>Items per page:</label>
            <select v-model="resultPerPage" @change="resetPage(0)">
                <option disabled value="">Result Per Page</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>100</option>
            </select>
        </section>
        <pg-pagination
        v-bind:totalPage="totalPage"
        v-bind:selected="selected"
        v-bind:resultPerPage="resultPerPage"
        v-on:resetPage="resetPage(0)"
        v-on:gotoPage="gotoPage"
        ></pg-pagination>
        <section id="productsLists">
            <div v-for="item in filteredProducts" v-bind:key="filteredProducts.price" class="item">
                <div>
                    <img v-bind:src="item.imageURL" width="100%" />
                    <p>{{ item.productName | toUppercase }}</p>
                    <p>RM {{ item.price | convertToDecimal }}</p>
                    <router-link v-bind:to="{ path: '/products/futsalshoes/' + item._id }"><button class="info">More</button></router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PagePagination from '@/src/components/Shared/PagePagination.vue'

export default {
    name: 'Products',
    components: {
        'pg-pagination': PagePagination
    },
    props: ['pg'],
    data () {
        return {
            selected: 1,
            products: [],
            startArrayPos: 0,
            resultPerPage: 10
        }
    },
    methods: {
        gotoPage(page) {
            this.$router.push({ path: '/products/' + page, query: { pageItem: this.resultPerPage } })
            this.selected = page
            this.startArrayPos = (page - 1) * parseInt(this.resultPerPage)
        },
        resetPage(page) {
            console.log('parent')
            this.$router.push({ path: '/products/1', query: { pageItem: this.resultPerPage } })
            this.selected = 1
            this.startArrayPos = page
        }
    },
    computed: {
        filteredProducts() {
            this.selected = parseInt(this.pg)
            this.resultPerPage = this.$route.query.pageItem
            const resultPerPage = parseInt(this.$route.query.pageItem)
            let startArray
            if (parseInt(this.pg) === 1) {
                startArray = 0
            } else {
                startArray = parseInt(this.pg - 1) * resultPerPage
            }
            let endArray = startArray + resultPerPage
            return this.products.slice(startArray, endArray)
        },
        totalPage() {
            return(Math.ceil(this.products.length / this.resultPerPage))
        }
    },
    created() {
        Vue.axios.get(`http://${this.$store.getters.ip}:3000/products`)
        .then((response) => {
            this.products = response.data
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>
