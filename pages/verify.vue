<template>
  <p>
    Verified. Please
    <n-link to="/login">
      login
    </n-link>.
  </p>
</template>

<script>
import config from '@/config'

export default {
  layout: 'auth',
  async asyncData({ req, $axios }) {
    try {
      // let { data } = await $axios.$post(config.connection + '/authManagement/', {
      await $axios.$post(config.connection + '/authManagement/', {
        action: 'verifySignupLong',
        value: req.query.token
      }, {
        headers: { Accept: 'application/json' }
      })
    } catch (e) {
      // console.log(e)
    }
  }
}
</script>
