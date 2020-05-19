<template>
  <div id="authenticated">
    <router-view />
    <div><a href="javascript:void(0)" @click="logout()">Logout</a></div>
  </div>
</template>
<script>
export default {
  name: 'Authenticated',
  methods: {
    async logout () {
      this.$store.commit({
        type: 'Auth/LOGOUT_SUCCESS'
      })
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style>
a {
  color: #41b883;;
  text-decoration: none;
}
</style>
