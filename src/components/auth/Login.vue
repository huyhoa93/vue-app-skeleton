<template>
  <div class="posts">
    <h1>Login</h1>
      <div class="form">
        <span class="err-message">{{ error_message }}</span>
        <div>
          <input class="username" type="text" name="username" placeholder="USERNAME" v-model="username">
        </div>
        <div>
          <input class="password" type="text" name="password" placeholder="PASSWORD" v-model="password">
        </div>
        <div class="checkbox-remember-me">
          <input type="checkbox" id="checkbox" v-model="is_keep_loging">
          <label for="checkbox">Remember me</label>
        </div>
        <div>
          <button class="login_btn" @click="login">Login</button>
        </div>
      </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      is_keep_loging: false,
      error_message: ''
    }
  },
  methods: {
    async login () {
      const scope = this
      if (!this.username || !this.password) return false
      AuthService.login({
        username: this.username,
        password: this.password,
        is_keep_loging: this.is_keep_loging
      })
        .then(function (response) {
          scope.$store.commit({
            type: 'Auth/LOGIN_SUCCESS',
            data: { token: response.data.token }
          })
          scope.$router.push({ name: 'Posts' })
        })
        .catch(function (error) {
          scope.error_message = error.response.data.message
        })
    }
  }
}
</script>

<style type="text/css">
.err-message {
  color: red;
}

.username, .password{
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}

.checkbox-remember-me {
  width: 500px;
  text-align: left;
  margin: 0 auto !important;
}

.form div {
  margin: 20px;
}

.login_btn {
  background: #41b883;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
