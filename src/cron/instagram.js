import instagramModel from '../api/instagram'
import accountModel from '../models/account'
import settingsModel from '../models/settings'
import palm from '../lib/palm'

export default async account => {
  const instaUser = await instagramModel.getUserMedia(account.username)
  const settings = await settingsModel.getOne({ createdBy: account.createdBy._id })

  const username = instaUser.username
  const media = instaUser.media.nodes[0]

  if (settings && settings.instagram) {
    if (media && (!account.offset || parseInt(account.offset) < media.date)) {
      const to = settings.instagram
      const text = `New photo from ${username} - https://instagram.com/p/${media.code}`

      palm.send({ to, text })

      accountModel.updateOffset(account._id, media.date)
        .then(res => console.log('updated offset'))
        .catch(err => console.error(err.message))
    } else {
      console.log('nothing new on instagram')
    }
  }
}
