<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>
          Sign Up Form
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-card-text>
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
        <v-btn color="primary" @click="onSubmit(email, password)">
          Sign Up
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="registerComplete" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Sign Up Complete
        </v-card-title>
        <v-card-text>
          Please check your email and verify your account.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" flat @click="dismissModal">
            Dismiss
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      registerComplete: false
    }
  },
  methods: {
    dismissError() {
      this.error = undefined
      this.clearAuthenticateError()
    },
    onSubmit(email, password) {
      const { User } = this.$FeathersVuex
      const currentUser = new User({
        email: email,
        password: password
      })
      const res = currentUser.save()
      if (res) {
        this.registerComplete = true
      }
    },
    dismissModal() {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
