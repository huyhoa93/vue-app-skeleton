const auth = {
  namespaced: true,
  state: {
    count: 5,
    isLoggedIn: false
  },
  mutations: {
    INCREMENT (state, payload) {
      state.count += payload.data.amount
    },
    LOGIN_SUCCESS: (state, payload) => {
      state.isLoggedIn = true
      localStorage.setItem('token', payload.data.token)
    },
    LOGOUT_SUCCESS: (state) => {
      state.isLoggedIn = true
      localStorage.removeItem('token')
    }
  },
  actions: {
    INCREMENT (context, data) {
      context.commit('INCREMENT', data)
    }
  },
  getters: {
    X5_STATE: state => {
      return state.count * 5
    }
  }
}
export default auth
