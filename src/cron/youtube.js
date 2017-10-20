import youtubeModel from '../api/youtube'
import accountModel from '../models/account'
import settingsModel from '../models/settings'
import palm from '../lib/palm'

export default async account => {
  const offset = await youtubeModel.getLatestVideoIdForChannel(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  if (settings && settings.youtube) {
    if (!account.offset || account.offset !== offset) {
      const to = settings.youtube
      const text = `New video on youtube from https://youtube.com/channel/${account.username}`

      palm.send({ to, text })

      accountModel.updateOffset(account._id, offset)
        .then(res => console.log('updated offset'))
        .catch(err => console.error(err))
    } else {
      console.log('nothing new on youtube')
    }
  }
}
