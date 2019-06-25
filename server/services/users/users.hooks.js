const { authenticate } = require('@feathersjs/authentication').hooks;

const verifyHooks = require('feathers-authentication-management').hooks;
const accountService = require('../authmanagement/notifier');

const commonHooks = require('feathers-hooks-common');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const facebookLogin = () => async context => {
  if (context.params.oauth && context.params.oauth.provider == 'facebook') {
    context.data.email = context.data.facebook.profile.emails[0].value
  }
  return context
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword(),
      verifyHooks.addVerification(),
      facebookLogin(),
    ],
    update: [
      commonHooks.disallow('external'),
      facebookLogin(),
    ],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider('external'),
          commonHooks.preventChanges(
            true,
            'email',
            'isVerified',
            'verifyToken',
            'verifyShortToken',
            'verifyExpires',
            'verifyChanges',
            'resetToken',
            'resetShortToken',
            'resetExpires'
          ),
          hashPassword(),
          authenticate('jwt')
        )
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      context => {
        if (context.params.oauth && context.params.oauth.provider == 'facebook') {
          return context
        }
        accountService(context.app).notifier('resendVerifySignup', context.result)
      },
      verifyHooks.removeVerification()
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
