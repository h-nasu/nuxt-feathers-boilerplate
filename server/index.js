'use strict'
const path = require('path')
const consola = require('consola')
const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config/')

const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('./logger')

const socketio = require('@feathersjs/socketio')

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')

const authentication = require('./authentication')

async function start() {
  const app = express(feathers())

  const { Nuxt, Builder } = require('nuxt')

  // Setup nuxt.js
  const config = require('../nuxt.config.js')
  config.rootDir = path.resolve(__dirname, '..')
  config.dev = process.env.NODE_ENV !== 'production'

  const nuxt = new Nuxt(config)
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  const configuration = require('@feathersjs/configuration')
  app.configure(configuration()).use(nuxt.render)

  // Enable security, CORS, compression, favicon and body parsing
  app.use(helmet())
  app.use(cors())
  app.use(compress())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  //app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
  // Host the public folder
  //app.use('/', express.static(app.get('public')))

  // Set up Plugins and providers
  app.configure(express.rest())
  app.configure(socketio())

  // Configure other middleware (see `middleware/index.js`)
  app.configure(middleware)
  app.configure(authentication)
  // Set up our services (see `services/index.js`)
  app.configure(services)
  // Set up event channels (see channels.js)
  app.configure(channels)

  // Configure a middleware for 404s and the error handler
  app.use(express.notFound())
  app.use(express.errorHandler({ logger }))

  app.hooks(appHooks)

  const host = app.get('host')
  const port = app.get('port')

  app.listen(port)

  consola.ready({
    message: `Feathers application started on ${host}:${port}`,
    badge: true
  })
}

start()
