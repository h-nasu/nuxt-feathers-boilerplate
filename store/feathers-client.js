import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'
import config from '@/config'

export const host = process.env.API_HOST || config.connection

export default function feathersClient(origin, storage) {
  const socket = io(host, {
    transports: ['websocket'],
    extraHeaders: {
      origin: origin || ''
    }
  })

  const feathersClient = feathers()
    .configure(socketio(socket))
    .configure(auth({ storage }))

  return feathersClient
}

export const browserClient = feathersClient('', new CookieStorage())
