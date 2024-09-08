
import { createRouter, createWebHistory } from 'vue-router'

import SplashView from '@/views/SplashView.vue'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import ItemView from '@/views/ItemView.vue'
import About from '@/views/Sidebar/About.vue'
import Contact from '@/views/Sidebar/Contact.vue'
import NetworkStatus from '@/views/NetworkStatus.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'Splash',
      component: SplashView,
      meta: {
        title: 'Splash',
      }
    },

    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Home',
      }
    },
    {
      path: '/network',
      name: 'NetworkStatus',
      component: NetworkStatus,
    },
    {
      path: '/:category/search',
      name: 'Search',
      component: SearchView,
      meta: {
        title: 'Search',
      }
    },

    {
      path: '/item/:id',
      name: 'Item',
      component: ItemView,
      meta: {
        title: 'Item',
      }
    },

    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: 'About',
      }
    },

    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {
        title: 'Contact',
      }
    }

  ]
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Fish Finder`
  next()
})


export default router
