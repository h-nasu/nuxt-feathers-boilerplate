<template>
  <v-app>
    <v-toolbar
      app
    >
      <v-toolbar-title class="green--text text--darken-3" v-text="siteTitle" />
      <v-spacer />

      <div v-if="!user">
        <v-toolbar-items>
          <v-btn flat to="/register">
            Sign Up
          </v-btn>
          <v-btn flat to="/login">
            Login
          </v-btn>
        </v-toolbar-items>
      </div>
      <div v-else>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/mypage">
              <v-list-tile-title>My Page</v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list>
            <v-list-tile
              @click="doLogout"
            >
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <v-layout
        justify-center
      >
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import AuthMixin from '@/mixins/AuthMixin'
import config from '@/config'

export default {
  mixins: [AuthMixin],
  data() {
    return {
      siteTitle: config.siteTitle
    }
  }
}
</script>
