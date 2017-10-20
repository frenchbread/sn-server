import VKApi from 'node-vkapi'

import config from '../config'

const VK = new VKApi(config.vk)

VK.authorize()
  .then(res => {
    console.log('auth ok')
    console.log(res)
  })
  .catch(err => console.error(err.message))

export default {
  getLastPost (domain) {
    return new Promise((resolve, reject) => {
      VK.call('wall.get', { domain })
        .then(res => resolve(res.items[0]))
        .catch(err => reject(err))
    })
  }
}
