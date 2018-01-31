import youtubeModel from '../api/youtube'
import accountModel from '../models/account'
import settingsModel from '../models/settings'

import { youtubePalm } from '../lib/palms'

export default async account => {
  const offset = await youtubeModel.getLatestVideoIdForChannel(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  if (!account.offset || account.offset !== offset) {
    if (settings && settings.admin) {
      notify({ account, sendTo: settings.admin, offset })
    } else {
      console.log(`youtube "${account.username}": no settings for admin`)
    }

    if (settings && settings.youtube) {
      notify({ account, sendTo: settings.youtube, offset })
    } else {
      console.log(`youtube "${account.username}": no settings for youtube`)
    }
  } else {
    console.log(`youtube "${account.username}": nothing new`)
  }
}

const notify = ({ account, sendTo, offset }) => {
  youtubePalm.send({
    to: sendTo,
    text: `New video on youtube from https://youtube.com/channel/${account.username}`
  })

  console.log(`youtube "${account.username}": message sent about new post`)

  accountModel.updateOffset(account._id, offset)
    .then(res => console.log(`youtube "${account.username}": updated offset`))
    .catch(err => console.error(err.message))
}
