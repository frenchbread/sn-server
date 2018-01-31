import youtubeModel from '../api/youtube'
import accountModel from '../models/account'
import settingsModel from '../models/settings'

import { youtubePalm } from '../lib/palms'

export default async account => {
  console.log('-- Checking for youtube user : ', account.username, ' --')
  const offset = await youtubeModel.getLatestVideoIdForChannel(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  if (!account.offset || account.offset !== offset) {
    if (settings && settings.admin) {
      notify({ account, sendTo: settings.admin, offset })
    } else {
      console.log('youtube: no settings for admin')
    }

    if (settings && settings.youtube) {
      notify({ account, sendTo: settings.youtube, offset })
    } else {
      console.log('youtube: no settings for youtube')
    }
  } else {
    console.log('youtube: nothing new')
  }
}

const notify = ({ account, sendTo, offset }) => {
  youtubePalm.send({
    to: sendTo,
    text: `New video on youtube from https://youtube.com/channel/${account.username}`
  })

  console.log('youtube: message sent about new post from ', account.username)

  accountModel.updateOffset(account._id, offset)
    .then(res => console.log('youtube: updated offset'))
    .catch(err => console.error(err.message))
}
