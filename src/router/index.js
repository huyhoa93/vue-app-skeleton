import Vue from 'vue'
import Router from 'vue-router'
import VueJwtDecode from 'vue-jwt-decode'
import HelloWorld from '@/components/HelloWorld'
import NotAuthenticated from '@/components/layout/NotAuthenticated'
import Authenticated from '@/components/layout/Authenticated'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: NotAuthenticated,
      children: [{
        path: '/login',
        name: 'Login',
        component: () => import('@/components/auth/Login')
      }]
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Authenticated,
      children: [{
        path: '/posts',
        name: 'Posts',
        component: () => import('@/components/posts/List')
      }]
    },
    {
      path: '/posts/new',
      name: 'AddPost',
      component: Authenticated,
      children: [{
        path: '/posts/new',
        name: 'AddPost',
        component: () => import('@/components/posts/Add')
      }]
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: Authenticated,
      children: [{
        path: '/posts/:id',
        name: 'EditPost',
        component: () => import('@/components/posts/Edit')
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to /login if not authenticate
  const publicPages = ['/', '/login']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('token')
  if (authRequired) {
    if (!token) {
      return next('/login')
    } else {
      const decode = VueJwtDecode.decode(token)
      if (decode.exp < Math.floor(new Date().getTime() / 1000)) {
        return next('/login')
      }
    }
  }
  if (to.path === '/login' && token) {
    const decode = VueJwtDecode.decode(token)
    if (decode.exp > Math.floor(new Date().getTime() / 1000)) {
      return next('/posts')
    }
  }
  next()
})

export default router
