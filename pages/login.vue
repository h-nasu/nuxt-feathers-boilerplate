<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login form</v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-card-text>
        <div v-if="error" class="error">
          {{ error.message }}
          <a class="close" href="javascript://" @click.prevent="dismissError">dismiss</a>
        </div>
        <v-form>
          <v-text-field
            v-model="email"
            prepend-icon="person"
            name="login"
            label="Login"
            type="text"
          />
          <v-text-field
            id="password"
            v-model="password"
            prepend-icon="lock"
            name="password"
            label="Password"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <n-link to="forgetPassword" class="mr-1">
          Forget Password
        </n-link>
        <v-btn to="/register" color="secondary">
          Sign Up
        </v-btn>
        <v-btn color="primary" @click="onSubmit(email, password)">
          Login
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-spacer />
        <v-btn color="info" @click="fbLogin">
          Login with Facebook
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import AuthMixin from '@/mixins/AuthMixin'

export default {
  layout: 'auth',
  mixins: [AuthMixin],
  data() {
    return {
      email: undefined,
      password: undefined,
      error: undefined
    }
  },
  methods: {
    dismissError() {
      this.error = undefined
      this.clearAuthenticateError()
    },
    onSubmit(email, password) {
      this.authenticate({ strategy: 'local', email, password })
        .then(() => {
          this.$router.replace({ path: '/mypage' })
        })
        // Just use the returned error instead of mapping it from the store.
        .catch((error) => {
          // Convert the error to a plain object and add a message.
          const type = error.className
          error = Object.assign({}, error)
          error.message = (type === 'not-authenticated')
            ? 'Incorrect email or password.'
            : 'An error prevented login.'
          this.error = error
        })
    },
    fbLogin() {
      window.location = '/auth/facebook'
    }
  }
}
</script>
