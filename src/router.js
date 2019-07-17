import Vue from 'vue'
import Router from 'vue-router'
import X404 from './views/404'
import { routes } from './modules'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Global routes, will override the modules' configuration.
    { path: '/404', name: '404', component: X404 },
    // This is a fallback catch.
    { path: '*', component: X404 },
    ...routes
  ]
})
