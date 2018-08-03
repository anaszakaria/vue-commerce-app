<template>
    <div id="add-product">
        <h1>Add Product</h1>
        <form v-on:submit.prevent="onUpload">
            <ul>
                <li>
                    <label for="productId">Product ID:</label>
                    <input v-focus type="text" id="productId" v-model="productId" name="productId">
                </li>
                <li>
                    <label for="productName">Product Name:</label>
                    <input type="text" id="productName" v-model="productName" name="productName">
                </li>
                <li>
                    <label>Brand:</label>
                    <select v-model="brand">
                        <option value="Adidas" selected>Adidas</option>
                        <option value="Joma">Joma</option>
                        <option value="Kelme">Kelme</option>
                        <option value="Lotto">Lotto</option>
                        <option value="Mizuno">Mizuno</option>
                        <option value="New Balance">New Balance</option>
                        <option value="Nike">Nike</option>
                        <option value="Pan">Pan</option>
                    </select>
                </li>
                <li>
                    <label for="price">Price:</label>
                    <input type="text" id="price" v-model="price" name="price">
                </li>
                <li>
                    <label for="desc">Description:</label>
                    <div>
                        <textarea rows="4" cols="50" name="desc" v-model="desc">Description...</textarea>
                    </div>
                </li>
                <li>
                    <label for="file">Upload Image:</label>
                    <input type="file" name="file" @change="onFileChanged">
                </li>
            </ul>
            <input type="submit" value="Submit" v-bind:class="{ active:true }">
        </form>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
    name: 'AddProduct',
    data () {
        return {
            selectedFile: null,
            productId: '',
            productName: '',
            brand: '',
            price: '',
            desc: ''
        }
    },
    methods: {
        onFileChanged(event) {
            this.selectedFile = event.target.files[0]
        },
        onUpload() {
            const formData = new FormData()
            formData.append('productId', this.productId)
            formData.append('productName', this.productName)
            formData.append('brand', this.brand)
            formData.append('price', this.price)
            formData.append('desc', this.desc)
            formData.append('productImage', this.selectedFile)
            for(var pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`)
            }
            Vue.axios.post(`http://${this.$store.getters.ip}:3000/products/add`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.getters.token
                }
            })
            .then((response) => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        }
    }
}
</script>
