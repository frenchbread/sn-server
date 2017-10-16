import twitterModel from '../api/twitter'
import accountModel from '../models/account'
import palm from '../lib/palm'

export default account => {
  twitterModel.getForUser(account.username)
    .then(tweets => {
      const tweet = tweets[0]

      // Check offset here
      if (parseInt(account.offset) !== tweet.id) {
        const text = `New tweet from ${tweet.user.screen_name} - https://twitter.com/${tweet.user.screen_name}`
        palm.send({ text })

        accountModel.updateOffset(account._id, tweet.id)
          .then(res => console.log('updated offset'))
          .catch(err => console.error(err))
      } else {
        console.log('nothing new on twitter')
      }
    })
    .catch(err => console.error(err))
}
