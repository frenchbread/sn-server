import vkModel from '../api/vk'
import accountModel from '../models/account'
import settingsModel from '../models/settings'
import palm from '../lib/palm'

export default async account => {
  const post = await vkModel.getLastPost(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  if (settings && settings.vk) {
    const offset = post.id.toString() + post.from_id.toString() + post.date.toString()

    if (!account.offset || parseInt(account.offset) !== parseInt(offset)) {
      const to = settings.vk
      const text = `New post on vk from https://vk.com/${account.username}`

      palm.send({ to, text })

      accountModel.updateOffset(account._id, offset)
        .then(res => console.log('updated offset'))
        .catch(err => console.error(err.message))
    } else {
      console.log('nothing new on vk')
    }
  }

}
