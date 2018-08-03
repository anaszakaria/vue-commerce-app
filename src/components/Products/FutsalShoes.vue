<template>
    <div id="futsal-shoes">
        <h1>{{ item.productName }}</h1>
        <img v-bind:src="item.imageURL" />
        <p>Ref:{{ item.productId }}</p>
        <h3>RM {{ item.price | convertToDecimal}}</h3>
        <p>{{ item.desc }}</p>
        <div class="item-counter">
            <div @click="subtractOrder"><h2>-</h2></div>
            <div><h2>{{ count }}</h2></div>
            <div @click="addOrder"><h2>+</h2></div>
        </div>
        <button @click="addToCart">Add to Cart</button>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
    props: ['id'],
    data() {
        return {
            item: {},
            count: 1
        }
    },
    methods: {
        addOrder() {
            this.count++
        },
        subtractOrder() {
            if (this.count <= 1) {
                return
            }
            this.count--
        },
        addToCart() {
            const cart = {
                _id: this.item._id,
                productId: this.item.productId,
                productName: this.item.productName,
                price: this.item.price,
                imageURL: this.item.imageURL,
                amountOrdered: this.count
            }
            this.$store.dispatch('addToCart', cart)
        }
    },
    created() {
        Vue.axios.get(`http://${this.$store.getters.ip}:3000/products/${this.id}`)
        .then((response) => {
            this.item = response.data
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>
