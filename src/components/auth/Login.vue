<template>
  <div class="login-form">
    <h1>Login</h1>
      <div class="form">
        <span class="err-message">{{ error_message }}</span>
        <div :class="{ 'form-group--error': submitted && $v.username.$error }">
          <input class="username" type="text" name="username" placeholder="USERNAME" v-model="username">
          <div class="error" v-if="submitted && !$v.username.required">* Username is required</div>
          <div class="error" v-if="submitted && !$v.username.minLength">* Username must have at least {{$v.username.$params.minLength.min}} characters.</div>
        </div>
        <div :class="{ 'form-group--error': submitted && $v.password.$error }">
          <input class="password" type="text" name="password" placeholder="PASSWORD" v-model="password">
          <div class="error" v-if="submitted && !$v.password.required">* Password is required</div>
          <div class="error" v-if="submitted && !$v.password.minLength">* Password must have at least {{$v.password.$params.minLength.min}} characters.</div>
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
import { required, minLength } from 'vuelidate/lib/validators'
import AuthService from '@/services/AuthService'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      is_keep_loging: false,
      error_message: '',
      submitted: false
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    async login () {
      this.submitted = true
      this.$v.$touch()
      const scope = this
      if (this.$v.$invalid) return false
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

.checkbox-remember-me, .error {
  width: 500px;
  text-align: left;
  margin: 10px auto !important;
}

.error {
  font-size: 12px;
  color: red;
  opacity: 0.8;
}

.form-group--error input {
  border-color: red;
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

.login_btn:focus{
  outline: none;
}
</style>
