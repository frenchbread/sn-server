import youtubeModel from '../api/youtube'
import accountModel from '../models/account'
import palm from '../lib/palm'

export default account => {
  youtubeModel.getLatestVideoIdForChannel(account.username)
    .then(offset => {
      if (!account.offset || account.offset !== offset) {
        const text = `New video on youtube from https://youtube.com/channel/${account.username}`
        palm.send({ text })

        accountModel.updateOffset(account._id, offset)
          .then(res => console.log('updated offset'))
          .catch(err => console.error(err))
      } else {
        console.log('nothing new on youtube')
      }
    })
    .catch(err => console.error(err))
}
