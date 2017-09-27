import Twitter from 'twitter'

import config from '../config'

export default {
  getForUser (screen_name) {
    const client = new Twitter(config.twitter)

    const params = { screen_name }

    return new Promise((resolve, reject) => {
      client.get('statuses/user_timeline', params, (err, tweets, response) => {
        if (err) reject(err)

        resolve(tweets)
      })
    })
  }
}
