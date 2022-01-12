import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

export default (_, inject) => {
  const echo = new Echo({
    broadcaster: 'pusher',
    key: 'LOCALTX81234', // .env
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true
  })

  inject('echo', echo)
}
