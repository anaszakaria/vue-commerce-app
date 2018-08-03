<template>
    <div id="cart">
        <h1>Shopping Cart</h1>
        <section>
            <div id="added-cart">
                <ul v-for="(item, index) in shoppingCart" class="cart-list">
                    <li><img v-bind:src="item.imageURL" width="160"></li>
                    <li>
                        <p>{{ item._id }}</p>
                        <p>Ref:{{ item.productId }}</p>
                    </li>
                    <li>{{ item.productName }}</li>
                    <li>RM {{ item.price | convertToDecimal }}</li>
                    <li>
                        <div class="item-counter">
                            <div @click="subtractOrder(index)"><h2>-</h2></div>
                            <div><h2>{{ amountList[index] }}</h2></div>
                            <div @click="addOrder(index)"><h2>+</h2></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="cart-summary">
                <header>Order Summary</header>
                <button @click="checkOut">CHECKOUT</button>
            </div>
        </section>
        <section>
            <button @click="removeItems">Remove All</button>
        </section>
        <app-modal>
            <header slot="modalheader">
                <h4>{{ modalheaderInfo }}</h4>
            </header>
            <div id="disclaimer">
                <p><b>Disclaimer:</b></p>
                <p>Default for unnnamed slot</p>
            </div>
            <footer slot="modalfooter">
                <h4>{{ modalfooterInfo }}</h4>
            </footer>
        </app-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
    name: 'Cart',
    data () {
        return {
            modalheaderInfo: 'Display Slot Header',
            modalfooterInfo: 'Display Slot Footer',
            amountOrdered: []
        }
    },
    methods: {
        addOrder(index, amount) {
            Vue.set(this.amountOrdered, index, this.amountOrdered[index]++)
            this.amountOrdered[index]++
        },
        subtractOrder(index, amount) {
            if (this.amountOrdered[index] <= 1) {
                return
            }
            Vue.set(this.amountOrdered, index, this.amountOrdered[index]--)
            this.amountOrdered[index]--
        },
        removeItems() {
            console.log('Remove All')
        },
        checkOut() {
            console.log('Checkout')
        }
    },
    mounted() {
        for (const item of this.$store.getters.cart) {
            this.amountOrdered.push(item.amountOrdered)
        }
    },
    computed: {
        shoppingCart() {
            return this.$store.getters.cart
        },
        amountList() {
            return this.amountOrdered
        }
    }
}
</script>
