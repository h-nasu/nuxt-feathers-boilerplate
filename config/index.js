export const isDev = Boolean(process.env.NODE_ENV !== 'production')

export default {
  siteTitle: 'Cyber Works Thailand',
  connection: process.env.VUE_APP_API_URL
    ? process.env.VUE_APP_API_URL
    : 'http://localhost:3000',
  domain: !isDev ? '*.my-domain.com' : 'localhost'
}
