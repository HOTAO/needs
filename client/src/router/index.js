import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import create from '@/views/create'
import manager from '@/views/manager/index'

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
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/manager',
      name: 'manager',
      component: manager
    }
  ]
})
