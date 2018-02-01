import Twitter from 'twitter'
const client = new Twitter(config.twitter)

import accountModel from '../models/account'

import config from '../config'

export default {
  getForUser (screen_name) {
    const params = {
      screen_name,
      exclude_replies: true,
      include_rts: false
    }

    return new Promise((resolve, reject) => {
      client.get('statuses/user_timeline', params, (err, tweets, response) => {
        if (err) {
          accountModel.update({ username: screen_name }, { needsManualCheck: true })
            .then(res => console.log(`${screen_name} was flagged as acc one that needs manual checking.`))
            .catch(err => console.error(err.message))
        } else {
          resolve(tweets)
        }
      })
    })
  }
}
