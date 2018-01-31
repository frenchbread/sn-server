import Twitter from 'twitter'
const client = new Twitter(config.twitter)

import config from '../config'

export default {
  getForUser (screen_name) {
    const params = { screen_name }

    return new Promise((resolve, reject) => {
      client.get('statuses/user_timeline', params, (err, tweets, response) => {
        if (err) console.error('twitter:err: ', err.message)

        resolve(tweets)
      })
    })
  }
}
