import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import upload from '@/views/upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
