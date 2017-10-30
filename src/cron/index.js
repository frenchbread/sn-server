import { CronJob } from 'cron'
import _ from 'lodash'

import accountModel from '../models/account'

import twitterNotifier from './twitter'
import instagramNotifier from './instagram'
import vkNotifier from './vk'
import youtubeNotifier from './youtube'

export default new CronJob('00 */5 * * * *', () => {
  accountModel.getAll()
    .then(accounts => {
      _.forEach(accounts, account => {
        if (account.type === 'twitter') {
          twitterNotifier(account)
        } else if (account.type === 'instagram') {
          instagramNotifier(account)
        } else if (account.type === 'vk') {
          vkNotifier(account)
        } else if (account.type === 'youtube') {
          youtubeNotifier(account)
        }
      })
    })
    .catch(err => new Error(err.message))
}, null, true, 'America/Los_Angeles')
