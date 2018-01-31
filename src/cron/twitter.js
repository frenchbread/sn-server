import twitterModel from '../api/twitter'
import accountModel from '../models/account'
import settingsModel from '../models/settings'

import { twitterPalm } from '../lib/palms'

export default async account => {
  console.log('-- Checking for twitter user : ', account.username, ' --')
  const tweets = await twitterModel.getForUser(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  const tweet = tweets[0]

  // Check offset here
  if (parseInt(account.offset) !== tweet.id) {
    if (settings && settings.admin) {
      notify({ account, sendTo: settings.admin, tweet })
    } else {
      console.log('twitter: no settings for admin')
    }

    if (settings && settings.twitter) {
      notify({ account, sendTo: settings.twitter, tweet })
    } else {
      console.log('twitter: no settings for twitter')
    }
  } else {
    console.log('twitter: nothing new on twitter')
  }
}

const notify = ({ account, sendTo, tweet }) => {
  twitterPalm.send({
    to: sendTo,
    text: `New tweet from ${tweet.user.screen_name} - https://twitter.com/${tweet.user.screen_name}`
  })
  console.log('twitter: message sent about new post from ', account.username)

  accountModel.updateOffset(account._id, tweet.id)
    .then(res => console.log('twitter: updated offset for ', account.username))
    .catch(err => console.error(err))
}
