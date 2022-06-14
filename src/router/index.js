import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/:type/:name',
      name: 'type',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TypePage.vue')
    },
    {
      path: '/:uid',
      name: 'article',
      component: () => import('../views/ArticlePage.vue')
    }
  ]
})

export default router
