import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Note from '../views/Note.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    props: true
  },
  {
    path: '/note',
    name: 'Note',
    component: Note,
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
