import twitterModel from '../api/twitter'
import accountModel from '../models/account'
import settingsModel from '../models/settings'

import palm from '../lib/palm'

export default async account => {
  const tweets = await twitterModel.getForUser(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  const tweet = tweets[0]

  if (settings && settings.twitter) {
    // Check offset here
    if (parseInt(account.offset) !== tweet.id) {
      const to = settings.twitter
      const text = `New tweet from ${tweet.user.screen_name} - https://twitter.com/${tweet.user.screen_name}`

      palm.send({ to, text })

      accountModel.updateOffset(account._id, tweet.id)
        .then(res => console.log('updated offset'))
        .catch(err => console.error(err))
    } else {
      console.log('nothing new on twitter')
    }
  }
}
