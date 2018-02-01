import vkModel from '../api/vk'
import accountModel from '../models/account'
import settingsModel from '../models/settings'

import { vkPalm } from '../lib/palms'

export default async account => {
  const posts = await vkModel.getLastPost(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  let withoutPinned = []

  posts.forEach(p => {
    if (p.is_pinned !== 1) withoutPinned.push(p)
  })

  const post = withoutPinned[0]

  const offset = post.id.toString() + post.from_id.toString() + post.date.toString()

  if (!account.offset || parseInt(account.offset) !== parseInt(offset)) {
    if (settings && settings.admin) {
      notify({ account, sendTo: settings.admin, offset, post })
    } else {
      console.log(`vk "${account.username}": no settings for admin`)
    }

    if (settings && settings.vk) {
      notify({ account, sendTo: settings.vk, offset, post })
    } else {
      console.log(`vk "${account.username}": no settings for vk`)
    }
  } else {
    console.log(`vk "${account.username}": nothing new on vk`)
  }
}

const notify = ({ account, sendTo, offset, post }) => {
  vkPalm.send({
    to: sendTo,
    text: `New post on vk from ${account.username} - https://vk.com/wall${post.from_id}_${post.id}`
  })

  console.log(`vk "${account.username}": message sent about new post`)

  accountModel.updateOffset(account._id, offset)
    .then(res => console.log(`vk "${account.username}": updated offset`))
    .catch(err => console.error(err.message))
}
