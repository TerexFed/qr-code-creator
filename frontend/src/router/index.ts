// @ts-ignore
import AuthView from '@/views/AuthView.vue'
// @ts-ignore
import CreatedQrCodes from '@/views/CreatedQrCodes.vue'
// @ts-ignore
import QrCodeCreateView from '@/views/QrCodeCreateView.vue'
// @ts-ignore
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
      path: '/qr-code-created',
      component: CreatedQrCodes,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (!token) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/qr-code-creator',
      component: QrCodeCreateView,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (!token) {
          next('/login');
        } else {
          next();
        }
      }
    }
  ],
})

export default router