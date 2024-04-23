import AuthView from '@/views/AuthView.vue'
import QrCodeCreateView from '@/views/QrCodeCreateView.vue'
import RegisrationView from '@/views/RegisrationView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: AuthView
    },
    {
      path: '/registration',
      component: RegisrationView
    },
    {
      path: '/qr-code-creator',
      component: QrCodeCreateView
    }
  ],
})

export default router
