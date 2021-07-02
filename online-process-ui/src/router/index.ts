import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/workflow',
    name: 'Workflow',
    component: () => import('../components/WorkflowForm.vue')
  },
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: () => import('../components/DynamicForm.vue')
  },
  {
    path: '/deposit-invoice',
    name: 'Deposit',
    component: () => import('../components/deposit/AddDepositForm.vue')
  },
  {
    path: '/deposit/:id',
    name: 'deposit',
    component: () => import('../components/deposit/EditDepositForm.vue')
  },
  {
    path: '/deposit-invoice/list',
    name: 'Deposit List',
    component: () => import('../components/deposit/ListDepositDatatable.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
