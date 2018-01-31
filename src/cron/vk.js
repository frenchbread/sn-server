import vkModel from '../api/vk'
import accountModel from '../models/account'
import settingsModel from '../models/settings'

import { vkPalm } from '../lib/palms'

export default async account => {
  console.log('-- Checking for vk user : ', account.username, ' --')
  const post = await vkModel.getLastPost(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  const offset = post.id.toString() + post.from_id.toString() + post.date.toString()

  if (!account.offset || parseInt(account.offset) !== parseInt(offset)) {
    if (settings && settings.admin) {
      notify({ account, sendTo: settings.admin, offset })
    } else {
      console.log('vk: no settings for admin')
    }

    if (settings && settings.vk) {
      notify({ account, sendTo: settings.vk, offset })
    } else {
      console.log('vk: no settings for vk')
    }
  } else {
    console.log('vk: nothing new on vk')
  }
}

const notify = ({ account, sendTo, offset }) => {
  vkPalm.send({
    to: sendTo,
    text: `New post on vk from https://vk.com/${account.username}`
  })

  console.log('vk: message sent about new post from ', account.username)

  accountModel.updateOffset(account._id, offset)
    .then(res => console.log('vk: updated offset'))
    .catch(err => console.error(err.message))
}
