import Vue from 'vue'
import Router from 'vue-router'
import Print from '@/views/print'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Print',
      component: Print
    }
  ]
})
