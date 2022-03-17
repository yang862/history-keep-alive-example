import Vue from 'vue'
import VueRouter from 'vue-router'
import Views from '../views'

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Views.Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Views.Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/usercenter',
    name: 'usercenter',
    component: Views.Usercenter,
    meta: {
      title: '我的'
    }
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

export default router
