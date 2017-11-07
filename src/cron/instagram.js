import instagramModel from '../api/instagram'
import accountModel from '../models/account'
import settingsModel from '../models/settings'

import { instagramPalm } from '../lib/palms'

export default async account => {
  const instaUser = await instagramModel.getUserMedia(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  const username = instaUser.username
  const media = instaUser.media.nodes[0]

  if (media && (!account.offset || parseInt(account.offset) < media.date)) {
    if (settings && settings.admin) {
      notify({ account, sendTo: settings.admin, username, media })
    } else {
      console.log('instagram: no settings for admin')
    }

    if (settings && settings.instagram) {
      notify({ account, sendTo: settings.instagram, username, media })
    } else {
      console.log('instagram: no settings for instagram')
    }
  } else {
    console.log('instagram: nothing new on instagram')
  }
}

const notify = ({ account, sendTo, username, media }) => {
  instagramPalm.send({
    to: sendTo,
    text: `New photo from ${username} - https://instagram.com/p/${media.code}`
  })
  console.log('instagram: message sent')

  accountModel.updateOffset(account._id, media.date)
    .then(res => console.log('instagram: updated offset'))
    .catch(err => console.error(err.message))
}
