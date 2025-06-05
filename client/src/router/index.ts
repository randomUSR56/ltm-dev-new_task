import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: { public: true }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  
  // Redirect to login if route requires auth and no API key
  if (to.meta.requiresAuth && !authStore.apiKey) {
    return '/login'
  }
  
  // Redirect to home if logged in and trying to access login
  if (to.meta.public && authStore.apiKey) {
    return '/'
  }
  
  // Fetch user if API key exists but user data isn't loaded
  if (authStore.apiKey && !authStore.user) {
    await authStore.fetchUser()
  }
})

export default router
