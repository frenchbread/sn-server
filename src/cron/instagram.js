import instagramModel from '../api/instagram'
import accountModel from '../models/account'
import palm from '../lib/palm'

export default account => {
  instagramModel.getUserMedia(account.username)
    .then(user => {
      const username = user.username
      const media = user.media.nodes[0]

      if (media && (!account.offset || parseInt(account.offset) < media.date)) {
        const text = `New photo from ${username} - https://instagram.com/p/${media.code}`
        palm.send({ text })

        accountModel.updateOffset(account._id, media.date)
          .then(res => console.log('updated offset'))
          .catch(err => console.error(err.message))
      } else {
        console.log('nothing new on instagram')
      }
    })
    .catch(err => console.error(err.message))
}
