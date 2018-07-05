import Router from 'vue-router'

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('../view/index.vue')
    },
    {
      path: '/qr',
      component: () => import('../view/qr.vue')
    }
  ]
})

export default router
