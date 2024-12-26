import { createRouter, createWebHistory } from 'vue-router'
import Feedback from '@/views/feedback.vue'
import table from '@/views/table.vue'
import login from '@/views/Login.vue'
import signup from '@/views/SignUp.vue'
import dashboard from '@/views/dashboard.vue'
import contacts from '@/views/contactView.vue'
import NotFoundView from '@/views/404.vue'
import home from '@/views/page.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/table',
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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: {
        title: 'dashboard',
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

// Authentication check and title change combined
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = `${to.meta.title} - Admin | Fish` || 'Fish app'

  // Check for token if route requires auth
  if (to.meta.requiresAuth) {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      next('/login')
      return
    }
  }
  
  next()
})

export default router







