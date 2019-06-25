<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Change Password Request Form</v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-card-text>
        <v-form>
          <v-text-field v-model="email" prepend-icon="person" name="email" label="Email" type="text" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="onSubmit(email)">
          Request Reset Password
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="registerComplete" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Change Password Request Complete
        </v-card-title>
        <v-card-text>
          Please check your email and change your password.
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
import { browserClient } from '@/store/feathers-client'

export default {
  layout: 'auth',
  data() {
    return {
      email: undefined,
      registerComplete: false
    }
  },
  methods: {
    dismissError() {
      this.error = undefined
      this.clearAuthenticateError()
    },
    onSubmit(email) {
      try {
        browserClient.service('authManagement').create({
          action: 'sendResetPwd',
          value: {
            email: email
          }
        })
        this.registerComplete = true
      } catch (e) {}
    },
    dismissModal() {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
