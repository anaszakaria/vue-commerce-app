<template>
    <div id="products">
        <h1>Products</h1>
        <pg-pagination
        v-bind:totalPage="totalPage"
        v-bind:resultPerPage="resultPerPage"
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

export default {
    name: 'Products',
    props: ['pg'],
    data () {
        return {
            products: [],
            startArrayPos: 0,
            resultPerPage: this.$route.query.pageItem
        }
    },
    computed: {
        filteredProducts() {
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
    watch: {
        '$route'(to, from) {
            // do something
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
