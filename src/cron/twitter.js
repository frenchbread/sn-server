import twitterModel from '../api/twitter'
import accountModel from '../models/account'
import settingsModel from '../models/settings'

import { twitterPalm } from '../lib/palms'

export default async account => {
  const tweets = await twitterModel.getForUser(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  const tweet = tweets[0]

  // Check offset here
  if (parseInt(account.offset) !== tweet.id) {
    if (settings && settings.admin) {
      notify({ account, sendTo: settings.admin, tweet })
    } else {
      console.log(`twitter "${account.username}": no settings for admin`)
    }

    if (settings && settings.twitter) {
      notify({ account, sendTo: settings.twitter, tweet })
    } else {
      console.log(`twitter "${account.username}": no settings for twitter`)
    }
  } else {
    console.log(`twitter "${account.username}": nothing new on twitter`)
  }

  if (account.needsManualCheck === true || !account.needsManualCheck) {
    accountModel.update({ _id: account._id }, { needsManualCheck: false })
      .then(res => console.log(`${account.name} was unflagged as acc that needs manual checking.`))
      .catch(err => console.error(err.message))
  }
}

const notify = ({ account, sendTo, tweet }) => {
  twitterPalm.send({
    to: sendTo,
    text: `New tweet from ${tweet.user.screen_name} - https://twitter.com/frbrr/status/${tweet.id_str}`
  })
  console.log(`twitter "${account.username}": message sent about new post`)

  accountModel.updateOffset(account._id, tweet.id)
    .then(res => console.log(`twitter "${account.username}": updated offset`))
    .catch(err => console.error(err))
}
