import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/pages/home'
Vue.use(VueRouter)

const routes = [
  { // 主页
    path: '/',
    name: '',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

export default router
