import vkModel from '../api/vk'
import accountModel from '../models/account'
import palm from '../lib/palm'

export default account => {
  vkModel.getLastPost(account.username)
    .then(post => {
      const offset = post.id.toString() + post.from_id.toString() + post.date.toString()

      if (!account.offset || parseInt(account.offset) !== parseInt(offset)) {
        const text = `New post on vk from https://vk.com/${account.username}`
        palm.send({ text })

        accountModel.updateOffset(account._id, offset)
          .then(res => console.log('updated offset'))
          .catch(err => console.error(err))
      } else {
        console.log('nothing new on vk')
      }
    })
    .catch(err => console.error(err))
}
