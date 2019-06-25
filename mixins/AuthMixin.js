import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', [
      'user'
    ])
  },
  methods: {
    ...mapMutations('auth', {
      clearAuthenticateError: 'clearAuthenticateError'
    }),
    ...mapActions('auth', ['authenticate', 'logout']),
    doLogout() {
      this.logout()
      this.$router.replace({ path: '/' })
    }
  },
  created() {
    if (this.user) {
      // init something for lggedin user
    }
  }
}
