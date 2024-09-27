import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '@/views/HomeView.vue'
import Feedback from '@/views/feedback.vue'
import table  from '@/views/table.vue'
import login from '@/views/Login.vue'
import signup from '@/views/SignUp.vue'
import contacts from '@/views/contactView.vue'

import NotFoundView from '@/views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    //   meta: {
    //     title: 'Home',
    //   },
    // },
    {
      path: '/',
      name: 'table',
      component: table,
      meta: {
        title: 'table',
      },
    },
    {
      path: '/contact',
      name: 'contacts',
      component: contacts,
      meta: {
        title: 'contacts',
      },
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {
        title: 'Feedback',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
      meta: { title: '404' }
    },{
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: 'login',
      },
    },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   component: signup,
    //   meta: {
    //     title: 'signup',
    //   },
    // },

  ]
})


// Change page title on route change
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Admin | Fish` || 'Fish app'
  next()
})


export default router
