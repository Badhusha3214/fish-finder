
import { createRouter, createWebHistory } from 'vue-router'

import SplashView from '@/views/SplashView.vue'
import ItemView from '@/views/ItemView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'splash',
      component: SplashView,
      meta: {
        title: 'Splash',
      }
    },

    {
      path: '/item',
      name: 'items',
      component: ItemView,
      meta: {
        title: 'Items',
      }
    }

  ]
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Fish Finder`
  next()
})


export default router
