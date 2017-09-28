import { CronJob } from 'cron'
import _ from 'lodash'

import twitterModel from '../api/twitter'
import instagramModel from '../api/instagram'
import accountModel from '../models/account'
import palm from '../lib/palm'

export default new CronJob('00 */1 * * * *', () => {
  accountModel.getAll()
    .then(accounts => {
      _.forEach(accounts, account => {
        if (account.type === 'twitter') {
          twitterModel.getForUser(account.name)
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
                console.log('nothing new')
              }
            })
            .catch(err => console.error(err))
        } else if (account.type === 'instagram') {
          instagramModel.getUserIdByUsername(account.name)
            .then(userId => {
              instagramModel.getMediasForUser(userId)
                .then(medias => {
                  const media = medias[0]

                  if (!account.offset || parseInt(account.offset) < media.created_time) {
                    const text = `New photo from ${media.user.username} - ${media.link}`
                    palm.send({ text })

                    accountModel.updateOffset(account._id, media.created_time)
                      .then(res => console.log('updated offset'))
                      .catch(err => console.error(err))
                  } else {
                    console.log('nothing new')
                  }
                })
                .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
        }
      })
    })
    .catch(err => new Error(err.message))
}, null, true, 'America/Los_Angeles')
