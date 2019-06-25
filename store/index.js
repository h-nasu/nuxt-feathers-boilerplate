import url from 'url'
import Vue from 'vue'
import feathersVuex, { initAuth } from 'feathers-vuex'
import feathersClient, { browserClient } from './feathers-client'

let featherPlugins = []
if (process.browser) {
  const { service: browserService, auth: browserAuth, FeathersVuex } = feathersVuex(browserClient, { idField: '_id', enableEvents: false })
  Vue.use(FeathersVuex)

  featherPlugins = [
    browserService('users', { paginate: true }),
    browserAuth({
      userService: 'users'
    })
  ]
}

export const plugins = [ ...featherPlugins ]

export const actions = {
  nuxtServerInit({ commit, dispatch, state }, { req, store }) {
    const parsedUrl = new url.URL(req.headers.host)
    const origin = `${parsedUrl.protocol}//${parsedUrl.hostname}`

    const storage = {
      getItem() {},
      setItem() {},
      removeItem() {}
    }

    const client = feathersClient(origin, storage)
    const { service, auth } = feathersVuex(client, { idField: '_id', enableEvents: false })

    service('users', { paginate: true })(store)
    auth({
      userService: 'users'
    })(store)

    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    })
      .then(() => {
        return dispatch('auth/authenticate', { accessToken: store.state.auth.accessToken, strategy: 'jwt' })
      })
      .then(() => {
        return dispatch('users/find', {})
      })
      .catch((_) => {})
  }
}
