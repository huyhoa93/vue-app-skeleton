import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth'

Vue.use(Vuex) // khai báo vue sử dụng plugin vuex

const store = new Vuex.Store({
  modules: {
    Auth
  }
})

export default store
