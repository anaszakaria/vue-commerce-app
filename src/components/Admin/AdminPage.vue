<template>
    <div id="admin-page">
        <h1>Admin Page</h1>
        <nav id="admin-menu">
            <ul>
                <li><router-link v-bind:to="{ path: '/admin/addproduct'}">Add Product</router-link></li>
                <li><router-link v-bind:to="{ path: '/admin/updateproduct'}">Update Product</router-link></li>
                <li><router-link v-bind:to="{ path: '/admin/deleteproduct'}">Delete Product</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'AdminPage',
    data () {
        return {

        }
    }
}
</script>
