import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inicio from '../views/Inicio.vue'


Vue.use(VueRouter)

const routes = [
  {
  path: '/',
    name: 'Home',
    component: Home
  },
  {
  path: '/Inicio',
  name: Inicio,
  component: () => import('../views/Inicio.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
