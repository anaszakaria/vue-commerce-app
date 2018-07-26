import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

// Home
const Home = resolve => require(['@/src/components/Home'], resolve)
const AddList = resolve => require(['@/src/components/AddList'], resolve)

// Shopping Cart
const Cart = resolve => require(['@/src/components/ShoppingCart/Cart'], resolve)

// Products
const Shop = resolve => require(['@/src/components/Products/Shop'], resolve)
const FutsalShoes = resolve => require(['@/src/components/Products/FutsalShoes'], resolve)

// Admin
const AdminPage = resolve => require(['@/src/components/Admin/AdminPage'], resolve)
const AddProduct = resolve => require(['@/src/components/Admin/AddProduct'], resolve)
const UpdateProduct = resolve => require(['@/src/components/Admin/UpdateProduct'], resolve)
const DeleteProduct = resolve => require(['@/src/components/Admin/DeleteProduct'], resolve)

// User
const SignUp = resolve => require(['@/src/components/User/SignUp'], resolve)
const SignIn = resolve => require(['@/src/components/User/SignIn'], resolve)
const Profile = resolve => require(['@/src/components/User/Profile'], resolve)

// Test page
const TestPage = resolve => require(['@/src/components/TestPage'], resolve)

// Error
const Error404 = resolve => require(['@/src/components/Error404'], resolve)

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/main',
            name: 'Main',
            component: Home
        },
        {
            path: '/addlist',
            name: 'AddList',
            component: AddList,
            props: true,
            beforeEnter: AuthGuard
        },
        {
            path: '/admin',
            name: 'AdminPage',
            component: AdminPage,
            beforeEnter: AuthGuard
        },
        {
            path: '/admin/addproduct',
            name: 'AddProduct',
            component: AddProduct,
            beforeEnter: AuthGuard
        },
        {
            path: '/admin/updateproduct',
            name: 'UpdateProduct',
            component: UpdateProduct,
            beforeEnter: AuthGuard
        },
        {
            path: '/admin/deleteproduct',
            name: 'DeleteProduct',
            component: DeleteProduct,
            beforeEnter: AuthGuard
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: AuthGuard
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart,
            props: true
        },
        {
            path: '/products/:pg',
            name: 'Shop',
            component: Shop,
            props: true
        },
        {
            path: '/products/futsalshoes/:id',
            name: 'FutsalShoes',
            component: FutsalShoes,
            props: true
        },
        {
            path: '/test',
            name: 'TestPage',
            component: TestPage
        },
        {
            path: '*',
            name: 'Error404',
            component: Error404
        }
    ],
    mode: 'history'
})
