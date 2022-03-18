import Vue from 'vue'
import Router from 'vue-router'
import VueJwtDecode from 'vue-jwt-decode'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/auth/Login'
import PostsList from '@/components/posts/List'
import PostsAdd from '@/components/posts/Add'
import PostsEdit from '@/components/posts/Edit'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiredAuth: false
      }
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/posts',
      name: 'Posts',
      component: PostsList,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/posts/new',
      name: 'AddPost',
      component: PostsAdd,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: PostsEdit,
      meta: {
        requiredAuth: true
      }
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
