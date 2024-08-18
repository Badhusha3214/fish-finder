
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import ItemView from '@/views/ItemView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      }
    },

    {
      path: '/:category/search',
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
