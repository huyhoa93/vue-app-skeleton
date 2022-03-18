// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import store from './store/index'
import Paginate from 'vuejs-paginate'
import Authenticated from './components/layout/Authenticated'
import NotAuthenticated from './components/layout/NotAuthenticated'
Vue.component('paginate', Paginate)
Vue.component('Authenticated', Authenticated)
Vue.component('NotAuthenticated', NotAuthenticated)
Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
