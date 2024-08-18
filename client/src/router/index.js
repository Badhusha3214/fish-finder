
import { createRouter, createWebHistory } from 'vue-router'

import SplashView from '@/views/SplashView.vue'
import SearchView from '@/views/SearchView.vue'
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
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        title: 'Search',
      }
    },

    {
      path: '/item/:id',
      name: 'item',
      component: ItemView,
      meta: {
        title: 'Item',
      }
    }

  ]
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Fish Finder`
  next()
})


export default router
